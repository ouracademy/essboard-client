import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core'
import { MediaObserver } from '@angular/flex-layout'
import Chart from 'chart.js'
import { randomColor } from '@shared/utils/random-color'
import { SocketService } from '@core/socket.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { combineLatest, from } from 'rxjs'

import { format } from 'date-fns'
import { ProjectService } from 'app/project/services/project.service'
import { switchMap, filter } from 'rxjs/operators'
import { Session } from '@models/project'

@Component({
  selector: 'app-radar-chart',
  template: `
    <div ngClass.sm="mobile" ngClass.gt-sm="gt-mobile">
      <canvas class="chart" width="320" height="320" #chart> </canvas>
    </div>
  `,
  styles: [
    `
      .gt-mobile {
        width: 70vh;
      }
      .mobile {
        width: 45vh;
      }
    `
  ]
})
export class RadarChartComponent implements OnInit, AfterViewInit {
  @Input() session: Session
  service

  @ViewChild('chart') chart: ElementRef
  radarChart: Chart = null

  constructor(
    private socketService: SocketService,
    private kernel: KernelService,
    private projectService: ProjectService,
    private media: MediaObserver
  ) {
    this.service = this.socketService.getService('charts')
  }

  ngOnInit() {}

  ngAfterViewInit() {
    combineLatest(
      this.projectService.currentProject$.pipe(
        filter(project => project),
        switchMap(project =>
          from<any[]>(
            this.service.find({
              query: {
                projectId: project.id,
                ...(!!this.session && { sessionId: this.session.id })
              }
            })
          )
        )
      ),
      this.kernel.getAlphas()
    ).subscribe(([sessions, alphas]) => {
      this.radarChart = toRadar(
        this.chart.nativeElement,
        sessions.map(session => toRadarData(session, alphas)),
        alphas.map(alpha => alpha.name),
        this.media.isActive('xs')
      )
    })
  }

  // events
  public chartClicked(e: any): void {
    console.log(e)
  }

  public chartHovered(e: any): void {
    console.log(e)
  }
}

const toRadar = (element, data, labels, isMobile) => {
  const fontSize = isMobile ? 12 : 18

  const options = {
    elements: {
      line: { tension: 0, borderWidth: 3 }
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 6
      },
      pointLabels: {
        fontSize
      }
    }
  }

  Chart.defaults.global.defaultFontSize = fontSize
  return new Chart(element, {
    type: 'radar',
    data: {
      labels: isMobile ? labels.map(wordsToLines) : labels,
      datasets: data
    },
    options
  })
}
const wordsToLines = text => text.split(' ')

const dataSet = (sessionStatus, alphas) => {
  return alphas.reduce((acc, alpha) => {
    const statusByAlpha = sessionStatus.find(x => x.alphaId === alpha.id)
    return [...acc, statusByAlpha ? statusByAlpha.stateId : 0]
  }, [])
}

const toRadarData = (session: any, alphas) => ({
  data: dataSet(session.status, alphas),
  label: `Session ${format(session.date, 'DD/M')}`,
  fill: true,
  backgroundColor: randomColor(session.id),
  pointBackgroundColor: 'rgb(255, 99, 132)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgb(255, 99, 132)'
})

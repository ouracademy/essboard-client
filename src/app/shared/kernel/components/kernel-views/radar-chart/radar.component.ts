import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core'
import Chart from 'chart.js'
import { randomColor } from '@shared/utils/random-color'
import { SocketService } from '@core/socket.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { combineLatest, from } from 'rxjs'

import { format } from 'date-fns'
import { ProjectService } from 'app/projects/services/project.service'
import { switchMap, filter } from 'rxjs/operators'
import { Session } from '@shared/no-module/models/project'

@Component({
  selector: 'app-radar-chart',
  template: `
    <div class="chart-container">
      <canvas class="chart" width="400" height="400" #chart> </canvas>
    </div>
  `,
  styles: [
    `
      .chart-container {
        position: relative;
        margin: auto;
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
    private projectService: ProjectService
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
        alphas.map(alpha => alpha.name)
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

const toRadar = (element, data, labels) => {
  const options = {
    elements: {
      line: { tension: 0, borderWidth: 3 }
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 6
      }
    }
  }

  return new Chart(element, {
    type: 'radar',
    data: {
      labels,
      datasets: data
    },
    options
  })
}

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

import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core'
import Chart from 'chart.js'
const seedrandom = require('seedrandom')
import { SocketService } from '@core/socket.service'
import { KernelService } from '@core/kernel-knowledge.service'

@Component({
  selector: 'app-radar-chart',
  template: `
    <canvas class="chart" width="400" height="400" #chart> </canvas>
  `
})
export class RadarChartComponent implements OnInit, AfterViewInit {
  @Input() idProject
  @Input() idSession
  @Input() level = 'all' // all | specific -->  session
  service

  @ViewChild('chart') chart: ElementRef
  radarChart: Chart = null

  constructor(
    private socketService: SocketService,
    private kernel: KernelService
  ) {
    this.service = this.socketService.getService('charts')
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // this.service
    //   .find({
    //     query: {
    //       idProject: this.idProject,
    //       idSession: this.idSession,
    //       level: this.level
    //     }
    //   })
    //   .then(result => {
    this.kernel.getAlphas().subscribe(alphas => {
      this.radarChart = toRadar(
        this.chart.nativeElement,
        result.map(session => toRadarData(session, alphas)),
        alphas.map(alpha => alpha.name)
      )
    })
    const result = [
      {
        status: [
          { alphaId: '1', stateId: 1 },
          { alphaId: '2', stateId: 2 },
          { alphaId: '3', stateId: 1 },
          { alphaId: '4', stateId: 2 },
          { alphaId: '5', stateId: 2 },
          { alphaId: '6', stateId: 1 },
          { alphaId: '7', stateId: 2 }
        ],
        id: '122',
        number: 1
      },
      {
        status: [
          { alphaId: '1', stateId: 1 },
          { alphaId: '2', stateId: 2 },
          { alphaId: '3', stateId: 1 },
          { alphaId: '4', stateId: 2 },
          { alphaId: '5', stateId: 2 },
          { alphaId: '6', stateId: 2 },
          { alphaId: '7', stateId: 2 }
        ],
        id: '123',
        number: 2
      },
      {
        status: [
          { alphaId: '1', stateId: 1 },
          { alphaId: '2', stateId: 2 },
          { alphaId: '3', stateId: 1 },
          { alphaId: '4', stateId: 3 },
          { alphaId: '5', stateId: 4 },
          { alphaId: '6', stateId: 5 },
          { alphaId: '7', stateId: 2 }
        ],
        id: '124',
        number: 3
      }
    ]

    // })
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
  label: `Session ${session.number}`,
  fill: true,
  backgroundColor: randomColor(session.id),
  pointBackgroundColor: 'rgb(255, 99, 132)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgb(255, 99, 132)'
})

const defaultRandom = () => Math.random()
const randomFrom = aText => () => {
  return seedrandom(aText)()
}
const palettePastelColor = (random = defaultRandom) => {
  const hBase = random()

  return {
    h: Math.floor(hBase * 360),
    s: 100,
    l: 60
  }
}

const randomColor = text => {
  const a = 0.5
  const { h, s, l } = palettePastelColor(randomFrom(text))
  return `hsla(${h}, ${s}%, ${l}%,${a})`
}

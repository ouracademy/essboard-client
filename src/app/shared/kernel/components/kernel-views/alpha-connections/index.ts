import { Component, OnInit, Input } from '@angular/core';
import { Kernel } from '../../../model/kernel';

class SVG {
  positionx: number;
  positiony: number;
  path: string;
  constructor(positionx: number, positiony: number, draw: string) {
    this.path = 'm ' + positionx + ',' + positiony + ' ' + draw;
  }

}
class AlphaView extends SVG {
  name: string;
  constructor(name: string, positionx: number, positiony: number, draw: string) {
    super(positionx, positiony, draw);
    this.name = name;
  }
}

class LineView extends SVG {
  constructor(positionx: number, positiony: number, draw: string) {
    super(positionx, positiony, draw);
  }
}

@Component({
  selector: 'alpha-connections',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class AlphaConnections implements OnInit {
  @Input()
  kernel: Kernel;

  drawAlpha: string = 'c 0,0 -15.08253,21.86648 -24.92188,36.0332 z m -24.92188,36.0332 -2.72265,3.93555 0,-4.17187 c 0,-19.78571 -15.92914,-35.71484 -35.71485,-35.71484 l -153.57226,0 c -19.78572,0 -35.71289,15.92913 -35.71289,35.71484 l 0,14.28515 c 0,19.78571 15.92717,35.71485 35.71289,35.71485 l 153.57226,0 c 1.41931,0 2.81625,-0.0905 4.19141,-0.25 l 3.89481,-0.71513 c 0,0 -3.3007,0.76333 -2.1702,0.47294 16.94929,-2.80429 29.79883,-17.45431 29.79883,-35.22266 l 0,-3.89648 2.7207,3.93359 c -1.21979,-2.46801 -2.16316,-4.76901 -2.7207,-6.79883 l 0,-0.48242 c 0.55794,-2.03125 1.50162,-4.3347 2.72265,-6.80469 z m -0.002,14.08594 c 9.45908,14.5459 24.92383,36.03711 24.92383,36.03711 z';
  drawLine: string = '-300.22958,-1.87281 -12.44969,-0.20706';

  alpha1 = new AlphaView('Interesado', 205.359, 77.994, this.drawAlpha);
  alpha2 = new AlphaView('Oportunidad', 810.359, 77.279, this.drawAlpha);
  alpha3 = new AlphaView('Requerimientos', 810.359, 289.279, this.drawAlpha);
  alpha4 = new AlphaView('Sistema Software', 204.359, 289.279, this.drawAlpha);
  alpha5 = new AlphaView('Trabajo', 810.359, 501.279, this.drawAlpha);
  alpha6 = new AlphaView('Equipo', 204.359, 501.279, this.drawAlpha);
  alpha7 = new AlphaView('Forma de trabajo', 522.359, 689.279, this.drawAlpha);
  alphas = [this.alpha1, this.alpha2, this.alpha3, this.alpha4, this.alpha5, this.alpha6, this.alpha7];
  line1 = new LineView(527.78962, 542.994, this.drawLine);
  line2 = new LineView(526.90055, 120.0102, this.drawLine);
  line3 = new LineView(526.90055, 336.0102, this.drawLine);
  line4 = new LineView(208.18743, 316.08654, this.drawLine);
  line5 = new LineView(526.19302, 317.01323, this.drawLine);
  line6 = new LineView(75.443061, 168.40049, this.drawLine);
  line7 = new LineView(75.443061, 386.40049, this.drawLine);
  line8 = new LineView(75.443061, 386.40049, this.drawLine);
  line9 = new LineView(675.44306, 168.40049, this.drawLine);
  line10 = new LineView(673.512, 494.96612, this.drawLine);
  line11 = new LineView(261.91413, 734.24787, this.drawLine);
  line12 = new LineView(505.60082, 734.24787, this.drawLine);
  lines = [this.line1, this.line2, this.line3, this.line4, this.line5, this.line6, this.line7, this.line8,
  this.line9, this.line10, this.line11, this.line12]

  hightlights = [
    { name: 'Interesado', hightLight: true },

  ];
  constructor() { }

  ngOnInit() {
    console.log('show', this.kernel);
  }

  test() {
    alert('ff');
  }
  isHightlight(nameAlpha: string) {
    let object = this.hightlights.find(alpha => alpha.name === nameAlpha);
    return object ? true : false;
  }

  public radarChartLabels: string[] = ['Oportunity', 'Stakeholder', 'Requeriments', 'System Software', 'Team', 'Way Working', 'Work'];

  public radarChartData: any = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Sesion 1' },
    { data: [1, 1, 1, 1, 1, 1, 5], label: 'Sesion 2' },
    { data: [2, 1, 2, 1, 1, 1, 6], label: 'Sesion 3' }
  ];

  public radarChartType: string = 'radar';

  public options: any = {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Proyecto'
    },
    scale: {
      reverse: false,
      ticks: {
        beginAtZero: true,
        stepSize: 1
      }
    }
  };

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { SocketService } from '@core/socket.service';

@Component({
    selector: 'app-radar-chart',
    template: `
    <canvas class="chart"  width="400" height="400" #chart> </canvas>
    `
})

export class RadarChartComponent implements OnInit {

    @Input() idProject
    @Input() idSession
    @Input() level = 'all' // all | specific -->  session
    service
    colorsBySession = {
        0: 'rgb(20, 128, 300, 0.4)',
        1: 'rgb(10, 150, 100, 0.4)',
        2: 'rgb(176, 50, 100, 0.4)',
        3: 'rgb(255, 250, 100, 0.4)',
        4: 'rgb(300, 10, 300, 0.4)'
    }

    public radarChartData: any = [
        { data: [1, 2, 1, 4, 2, 1, 2], fill: true, label: 'Sesion 1', backgroundColor: this.colorsBySession[1 % 5] },
        { data: [1, 2, 1, 4, 2, 2, 2], fill: true, label: 'Sesion 2', backgroundColor: this.colorsBySession[2 % 5] },
        { data: [1, 3, 1, 5, 2, 3, 2], fill: true, label: 'Sesion 3', backgroundColor: this.colorsBySession[3 % 5] },
        { data: [1, 3, 1, 4, 4, 4, 2], fill: true, label: 'Sesion 4', backgroundColor: this.colorsBySession[4 % 5] },
        { data: [1, 1, 1, 2, 1, 5, 5], fill: true, label: 'Sesion 5', backgroundColor: this.colorsBySession[5 % 5] }
    ];
    @ViewChild('chart') chart: ElementRef;
    radarChart: Chart = null


    radarChartLabels: string[] = ['Oportunidad', 'Interesado', 'Requerimientos', 'Sistema de software', 'Equipo', 'Forma de trabajo', 'Trabajo'];
    options: any = {
        elements:
            { line: { tension: 0, borderWidth: 3 } }
    }
    constructor(private socketService: SocketService) {
        this.service = this.socketService.getService('charts')
    }

    ngOnInit() {
        this.service
            .find({
                query: {
                    idProject: this.idProject, idSession: this.idSession, level: this.level
                }
            })
            .then(result => {

                this.radarChartData = result.map(session => {
                    return {
                        data: session['summaryStateByAlpha'], label: 'Sesion ' + session['nroOrder'],
                        fill: false, backgroundColor: this.colorsBySession[session['nroOrder'] % 10],
                        "pointBackgroundColor": "rgb(255, 99, 132)", "pointBorderColor": "#fff", "pointHoverBackgroundColor": "#fff", "pointHoverBorderColor": "rgb(255, 99, 132)"
                    }
                })
                // this.showRadar(this.radarChartData);
            })
        // ,"borderColor":"rgb(255, 99, 132)","pointBackgroundColor":"rgb(255, 99, 132)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(255, 99, 132)"

    }

    ngAfterViewInit() {
        this.showRadar(this.radarChartData);
    }

    private showRadar(data) {
        this.radarChart = new Chart(this.chart.nativeElement, {
            type: 'radar',
            data: {
                labels: this.radarChartLabels,
                datasets: data
            },
            options: this.options
        });
    }

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
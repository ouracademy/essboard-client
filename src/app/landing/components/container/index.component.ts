import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: 'index.component.html',
    styles: [
        `
        .icon-image{
            height:100px;
            width:100px;
        }`
    ]
})
export class LandingComponent implements OnInit {
    kernelIcons = [
        { name: 'Interesado', x: -254, y: -130 },
        { name: 'Requerimientos', x: -10, y: -254 },
        { name: 'Sistema de Software', x: -10, y: -134 },
        { name: 'Equipo', x: -130, y: -134 },
        { name: 'Trabajo', x: -10, y: -10 },
        { name: 'Forma de trabajo', x: -254, y: -10 },
        { name: 'Oportunidad', x: -134, y: -10 }
    ]

    constructor() { }

    getBackground(item) {
        return `url(assets/images/kernel-icons.png) ${item.x}px ${item.y}px`
    }

    ngOnInit() { }
}
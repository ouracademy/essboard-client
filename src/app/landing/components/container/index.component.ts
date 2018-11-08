import { Component, OnInit } from '@angular/core'
import { AuthService } from '@core/auth.service'

@Component({
  selector: 'app-landing',
  templateUrl: 'index.component.html',
  styles: [
    `
      .icon {
        margin: 20px;
      }
      .icon-image {
        height: 100px;
        width: 100px;
      }
    `
  ]
})
export class LandingComponent implements OnInit {
  labels = {
    slogan: 'Monitorea tu desarrollo en base a estados universales',
    description:
      'Essboard es la herramienta que te ayudara a usar Esencia en tu desarrollo',
    start: 'Inicia tu monitoreo ahora'
  }
  kernelIcons = [
    { name: 'Oportunidad', x: -134, y: -10 },
    { name: 'Interesado', x: -254, y: -130 },
    { name: 'Requerimientos', x: -10, y: -254 },
    { name: 'Sistema de Software', x: -10, y: -134 },
    { name: 'Equipo', x: -130, y: -134 },
    { name: 'Trabajo', x: -10, y: -10 },
    { name: 'Forma de trabajo', x: -254, y: -10 }
  ]

  constructor(public auth: AuthService) {}

  getBackground(item) {
    return `url(assets/images/kernel-icons.png) ${item.x}px ${item.y}px`
  }

  ngOnInit() {}
}

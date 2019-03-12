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
        margin: auto;
      }

      .mat-display-3 {
        margin: 0 0 40px;
      }
    `
  ]
})
export class LandingComponent implements OnInit {
  labels = {
    slogan: 'Descubre como va tu desarrollo',
    description:
      'Essboard es la herramienta que te ayuda a determinar el estado y las metas ' +
      'de tu proyecto tomando en cuenta las opiniones de tu equipo y cada una de las dimensiones esenciales de un proyecto',
    start: 'Inicia ahora '
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

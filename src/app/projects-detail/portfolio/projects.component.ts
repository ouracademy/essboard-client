import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  owners = [
    {
      name: 'me',
      projects: [
        {
          id: 1,
          name: 'CIDUNI',
          lastTimeUpdated: new Date(2018, 0, 12),
        }
      ]
    },
    {
      name: 'MPFN',
      projects: [
        {
          id: 2,
          name: 'Carpeta Fiscal',
          lastTimeUpdated: new Date(2018, 2, 17)
        },
        {
          id: 3,
          name: 'Mesa de Parte',
          lastTimeUpdated: new Date(2018, 1, 3),
        }
      ]
    },
    {
      name: 'Ouracademy',
      projects: [
        {
          id: 4,
          name: 'Blog',
          lastTimeUpdated: new Date(2018, 2, 16)
        }
      ]
    },
    {
      name: 'El equipo'
    }
  ]
  isLoading = true

  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.isLoading = false }, 1000)

  }
}

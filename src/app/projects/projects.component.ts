import { Component, OnInit } from '@angular/core';

interface Project {
  name: string
  lastTimeUpdated: Date
  owner?: User
}

interface User {
  avatar?: string
  name: string
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      name: 'Carpeta Fiscal',
      lastTimeUpdated: new Date(2018, 2, 17),
      owner: {
        name: 'MPFN'
      }
    },
    {
      name: 'Mesa de Parte',
      lastTimeUpdated: new Date(2018, 1, 3),
      owner: {
        name: 'MPFN'
      }
    },
    {
      name: 'CIDUNI',
      lastTimeUpdated: new Date(2018, 0, 12),
    },
    {
      name: 'Blog',
      lastTimeUpdated: new Date(2018, 2, 16),
      owner: {
        name: 'Ouracademy'
      }
    }
  ]
  isLoading = true

  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.isLoading = false }, 1000)

  }
}

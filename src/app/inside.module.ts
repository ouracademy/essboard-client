import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InsideLayoutModule } from '@layouts/inside'
import { InsideLayoutComponent } from '@layouts/inside/layout.component'
import { PROVIDERS_SESSION } from './sessions/providers.module'
import { MembersService } from './members/members.service'

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProjectService } from './project/services/project.service'
import { ProjectSocketService } from './project/services/project-socket.service'

@Component({
  selector: 'project-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
      }
    `
  ]
})
export class ProjectLayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: ProjectService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.selectedProject = params['id']
    })
  }
}

const routes: Routes = [
  {
    path: '',
    component: InsideLayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: 'app/projects/module#ProjectsModule'
      },
      {
        path: 'projects/:id',
        component: ProjectLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: 'app/project/module#ProjectModule'
          },
          {
            path: 'sessions',
            loadChildren: 'app/sessions/module#SessionModule'
          }
        ]
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes), InsideLayoutModule],
  exports: [RouterModule],
  declarations: [ProjectLayoutComponent],
  providers: [
    ...PROVIDERS_SESSION,
    { provide: ProjectService, useClass: ProjectSocketService },
    MembersService
  ]
})
export class InsideRoutingModule {}

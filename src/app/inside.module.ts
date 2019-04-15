import { Injectable, NgModule } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router'
import { InsideLayoutModule } from '@layouts/inside'
import { InsideLayoutComponent } from '@layouts/inside/layout.component'
import { MembersService } from './members/members.service'
import {
  ProjectLayoutComponent,
  ProjectLayoutModule
} from './project-layout/module'
import { ProjectSocketService } from './project/services/project-socket.service'
import { ProjectService } from './project/services/project.service'
import { PROVIDERS_SESSION } from './sessions/providers.module'

@Injectable()
export class ProjectGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id: projectId } = route.params
    return true
  }
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'projects',
        component: InsideLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: 'app/projects/module#ProjectsModule'
          }
        ]
      },
      {
        path: 'projects/:id',
        component: ProjectLayoutComponent,
        canActivate: [ProjectGuardService],
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
      },
      {
        path: 'invitations',
        component: InsideLayoutComponent,
        children: [
          {
            path: ':id',
            loadChildren: 'app/invitation/invitation.module#InvitationModule'
          }
        ]
      }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    InsideLayoutModule,
    ProjectLayoutModule
  ],
  exports: [RouterModule],
  providers: [
    ...PROVIDERS_SESSION,
    { provide: ProjectService, useClass: ProjectSocketService },
    MembersService,
    ProjectGuardService
  ]
})
export class InsideRoutingModule {}

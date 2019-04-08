import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InsideLayoutModule } from '@layouts/inside'
import { InsideLayoutComponent } from '@layouts/inside/layout.component'
import { HeaderModule } from '@shared/header/index.module'
import { PROVIDERS_SESSION } from './sessions/providers.module'
import { MembersService } from './members/members.service'

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProjectService } from './project/services/project.service'
import { ProjectSocketService } from './project/services/project-socket.service'
import { Injectable } from '@angular/core'

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { NotificationsModule } from '@shared/notifications/index.module'
import { AccountModule } from '@shared/account/index.module'
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material'
import { Observable } from 'rxjs'
import { Project } from '@shared/models/project'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ShareComponent } from './project/components/share/share.component'

@Injectable()
export class ProjectGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id: projectId } = route.params
    return true
  }
}

@Component({
  selector: 'project-layout',
  template: `
    <div class="container-column viewport-full">
      <app-header mode="toolbar">
        <left-content
          class="row middle-xs pad-1"
          *ngIf="(project$ | async) as project"
        >
          <div class="text--head" fxLayout="column">
            <span
              class="info mat-title"
              [matTooltip]="project.description"
              matTooltipPosition="above"
            >
              {{ project.name }}
            </span>
          </div>
        </left-content>
        <right-content class="row middle-xs">
          <div *ngIf="(project$ | async) as project">
            <button mat-raised-button color="primary" (click)="share(project)">
              <mat-icon class="md-24">people</mat-icon>
              &nbsp; <span class="mat-body-1">Compartir</span>
            </button>
          </div>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>settings</mat-icon>
          </button>
          <mat-menu
            class="menu-options"
            x-position="after"
            y-position="below"
            #menu="matMenu"
          >
            <button mat-menu-item (click)="delete()" app-not-implemented>
              <mat-icon class="md-24">delete_forever</mat-icon>
              Elimina este proyecto
            </button>
          </mat-menu>
          <app-notifications></app-notifications>
          <app-account></app-account>
        </right-content>
      </app-header>
      <div class="pad-0-5 container-complement">
        <router-outlet></router-outlet>
      </div>
    </div>
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
  project$: Observable<Project>
  constructor(private route: ActivatedRoute, private service: ProjectService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.selectedProject = params['id']
    })
    this.project$ = this.service.currentProject$
  }
  delete() {}
  share() {
    this.service.showShareProject()
  }
}
@NgModule({
  imports: [
    NotificationsModule,
    AccountModule,
    HeaderModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatDialogModule
  ],
  declarations: [ProjectLayoutComponent, ShareComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ShareComponent]
})
export class ProjectLayoutModule {}

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

import { CommonModule } from '@angular/common'
import { Component, NgModule, NO_ERRORS_SCHEMA, OnInit } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { AccountModule } from '@shared/account/index.module'
import { HeaderModule } from '@shared/header/index.module'
import { Project } from '@shared/models/project'
import { NotificationsModule } from '@shared/notifications/index.module'
import { ShareComponent } from 'app/project/components/share/share.component'
import { ProjectService } from 'app/project/services/project.service'
import { SearchUsersModule } from 'app/users/search.module'
import { Observable } from 'rxjs'

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
              class="info title-project mat-title"
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
              &nbsp; <span class="mat-body-1">Share</span>
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
              Delete project
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
  styleUrls: ['index.component.scss']
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

  // TODO: remove ngIf=false
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
    MatDialogModule,
    SearchUsersModule
  ],
  declarations: [ProjectLayoutComponent, ShareComponent],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [ShareComponent]
})
export class ProjectLayoutModule {}

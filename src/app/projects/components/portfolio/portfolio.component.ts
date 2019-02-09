import { Component, OnInit } from '@angular/core'
import { Project } from '@no-module/models/project'
import { ProjectsService } from '../../services/projects.service'
import { AuthService } from '@core/auth.service'
import { User } from '@no-module/models/user'
import { MatDialog } from '@angular/material'
import { CreateComponent } from '../create/create.component'
import { DataList } from '@shared/render-ctrl/index.component'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Component({
  selector: 'project-portfolio',
  template: `
    <div class="pad-1 container-column">
      <div class="row between-xs middle-xs">
        <span class="primary">{{ title }}</span>
        <button mat-icon-button class="main" (click)="createProject()">
          <mat-icon>add</mat-icon>
        </button>
      </div>
      <app-render-ctrl class="container-complement">
        <project-list #data></project-list>
      </app-render-ctrl>
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
export class ProjectPortfolioComponent {
  title = 'Mis proyectos'

  constructor(private matDialog: MatDialog) {}

  createProject(): void {
    this.matDialog.open(CreateComponent)
  }
}

@Component({
  selector: 'project-list',
  template: `
    <div class="container-elements row">
      <project-card
        class="col-xs-12 col-md-3"
        *ngFor="let project of projects"
        [project]="project"
        [user]="user"
      ></project-card>
    </div>
  `
})
export class ProjectListComponent implements OnInit, DataList {
  projects: Project[] = []
  isLoaded$: BehaviorSubject<boolean>
  isEmpty$: BehaviorSubject<boolean>
  user: User
  constructor(
    private projectsService: ProjectsService,
    private auth: AuthService
  ) {
    this.isLoaded$ = new BehaviorSubject(false)
    this.isEmpty$ = new BehaviorSubject(true)
  }
  ngOnInit() {
    this.user = this.auth.user
    this.projectsService.items$.subscribe((items: Project[]) => {
      this.projects = items
      this.isLoaded$.next(true)
      this.isEmpty$.next(this.projects.length === 0)
    })
    this.projectsService.getProjects()
  }
}

import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { AuthService } from '@core/auth.service'
import { Project } from '@models/project'
import { User } from '@models/user'
import { DataList } from '@shared/render-ctrl/index.component'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ProjectsService } from '../../services/projects.service'
import { CreateComponent } from '../create/create.component'

@Component({
  selector: 'project-portfolio',
  template: `
    <div class="pad-1 container-column">
      <div class="row between-xs middle-xs">
        <span class="primary mat-title">{{ title }}</span>
        <button mat-raised-button class="main" (click)="createProject()">
          <mat-icon>add</mat-icon>
          create project
        </button>
      </div>
      <app-render-ctrl
        class="container-complement"
        (addButton)="createProject()"
        [options]="optionsRender"
      >
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
  title = 'My projects'
  optionsRender = {
    message: `You don't have any projects yet, start by creating one by clicking`,
    image: 'assets/images/project.png',
    addButton: { message: 'Here' }
  }

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

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { RenderCtrlModule } from '@shared/render-ctrl/index.module'

import { ProjectsService } from './services/projects.service'
import { ProjectsSocketService } from './services/projects-socket.service'

import {
  ProjectPortfolioComponent,
  ProjectListComponent,
  CardComponent,
  CreateComponent
} from './index'
import { FlexLayoutModule } from '@angular/flex-layout'

const routes: Routes = [{ path: '', component: ProjectPortfolioComponent }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,

    FlexLayoutModule,
    RenderCtrlModule
  ],
  declarations: [
    ProjectPortfolioComponent,
    ProjectListComponent,
    CardComponent,
    CreateComponent
  ],
  entryComponents: [CreateComponent],
  providers: [{ provide: ProjectsService, useClass: ProjectsSocketService }]
})
export class ProjectsModule {}

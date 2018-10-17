import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatIconModule,
  MatSidenavModule,
  MatDialogModule
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms'

import { FormsModule } from '@angular/forms';
import  { KernelModule } from '@shared/kernel/kernel.module'

import { LoadingModule } from '../shared/loading/loading.module';

import { RoutingModule } from './routing.module';


import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent,ConfirmationDialog} from './components/project-detail/project-detail.component';
import { ProjectCardComponent } from './components/project-list/project-card/project-card.component';
import { TilesSessionsComponent } from './components/project-detail/tiles-sessions/index.component';

/* forms*/
import { ProjectFormComponent } from './components/forms/project-form/project-form.component';
import { SharedFormComponent } from './components/forms/shared-form/shared-form.component';


import { ProjectService } from './services/project.service';
import { ProjectSocketService } from './services/project-socket.service';

import { ProjectsService } from './services/projects.service';
import { ProjectsSocketService } from './services/projects-socket.service';



@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatDialogModule,

    FlexLayoutModule,

    LoadingModule,
    RoutingModule,


    FormsModule,
    KernelModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailComponent,
    TilesSessionsComponent,
    ProjectFormComponent,
    SharedFormComponent,
    ConfirmationDialog
  ],
  entryComponents: [ ConfirmationDialog ],
  providers: [
    { provide: ProjectService, useClass: ProjectSocketService },
    { provide: ProjectsService, useClass: ProjectsSocketService }
  ]
})


export class Module { }

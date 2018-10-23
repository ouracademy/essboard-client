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


import { ReactiveFormsModule } from '@angular/forms'

import { FormsModule } from '@angular/forms';
import  { KernelModule } from '@shared/kernel/kernel.module'

import { LoadingModule } from '../shared/loading/loading.module';

import { SearchUsersModule } from '../users/search.module';
import { RoutingModule } from './routing.module';


import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent,ConfirmationDialog} from './components/project-detail/project-detail.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SessionsListComponent } from './components/sessions-list/index.component';


import { ProjectCreateComponent } from './components/project-create/project-form.component';
import { SharedFormComponent } from './components/project-share/shared-form.component';


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
    SearchUsersModule,



    LoadingModule,
    RoutingModule,


    FormsModule,
    KernelModule
  ],
  declarations: [
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailComponent,
    SessionsListComponent,
    ProjectCreateComponent,
    SharedFormComponent,
    ConfirmationDialog
  ],
  entryComponents: [ ConfirmationDialog, ProjectCreateComponent, SharedFormComponent ],
  providers: [
    { provide: ProjectService, useClass: ProjectSocketService },
    { provide: ProjectsService, useClass: ProjectsSocketService }
  ]
})


export class Module { }

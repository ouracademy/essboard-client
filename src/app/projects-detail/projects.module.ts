import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';

import { KernelModule } from '../../shared/modules/kernel/kernel.module';
import { UsersModule } from '../users/index.module';
import { SessionsModule } from '../sessions/sessions.module';
import { AvatarLetterModule } from '../../shared/modules/avatar-letter/index.module';

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
    FormsModule,
    UsersModule,
    KernelModule,
    MaterialModule,
    DragulaModule,
    AvatarLetterModule,
    SessionsModule
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
  entryComponents: [ConfirmationDialog],
  providers: [
    { provide: ProjectService, useClass: ProjectSocketService },
    { provide: ProjectsService, useClass: ProjectsSocketService }
  ],
  exports: [
    ProjectListComponent,
    ProjectDetailComponent
  ]
})
export class ProjectsModule { }
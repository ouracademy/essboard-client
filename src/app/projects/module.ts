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
  MatDialogModule
} from '@angular/material'


import { ReactiveFormsModule } from '@angular/forms'

import { FormsModule } from '@angular/forms';
import { KernelModule } from '@shared/kernel/kernel.module'

import { LoadingModule } from '../shared/loading/loading.module';

import { SearchUsersModule } from '../users/search.module';
import { RoutingModule } from './routing.module';


import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { CardComponent } from './components/card/card.component';
import { SessionsListComponent } from './components/sessions-list/index.component';


import { CreateComponent } from './components/create/create.component';
import { ShareComponent } from './components/share/share.component';


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
    MatDialogModule,
    SearchUsersModule,

    LoadingModule,
    RoutingModule,

    FormsModule,
    KernelModule
  ],
  declarations: [
    ListComponent,
    CardComponent,
    DetailComponent,
    SessionsListComponent,
    CreateComponent,
    ShareComponent
  ],
  entryComponents: [CreateComponent, ShareComponent],
  providers: [
    { provide: ProjectService, useClass: ProjectSocketService },
    { provide: ProjectsService, useClass: ProjectsSocketService }
  ]
})


export class Module { }

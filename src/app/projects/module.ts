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

import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { KernelModule } from '@shared/kernel/kernel.module'
import { LoadingModule } from '@shared/loading/loading.module'
import { SearchUsersModule } from '../users/search.module'

import { RoutingModule } from './routing.module'

import {
  ListComponent,
  DetailComponent,
  CardComponent,
  SessionsListComponent,
  CreateComponent,
  ShareComponent
} from './index'

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
  entryComponents: [CreateComponent, ShareComponent]
})
export class Module {}

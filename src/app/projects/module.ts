import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule
} from '@angular/material'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { RoutingModule } from './routing.module'
import { KernelModule } from '@shared/kernel/kernel.module'
import { LoadingModule } from '@shared/loading/loading.module'
import { SearchUsersModule } from '../users/search.module'
import { RenderCtrlModule } from '@shared/render-ctrl/index.module'
import { NotImplementedModule } from '@shared/not-implemented/index.module'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { LoadingWhenClickedModule } from '@shared/loading-when-clicked'

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
    FormsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,

    SearchUsersModule,
    LoadingModule,
    RenderCtrlModule,
    NotImplementedModule,
    LoadingWhenClickedModule,

    KernelModule,
    OurAvatarModule,
    RoutingModule
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
export class ProjectModule {}

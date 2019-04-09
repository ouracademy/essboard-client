import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatTooltipModule,
  MatMenuModule
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'

import { SearchUsersModule } from '../users/search.module'
import { KernelModule } from '@shared/kernel/kernel.module'
import { NotImplementedModule } from '@shared/not-implemented/index.module'
import { LoadingWhenClickedModule } from '@shared/loading-when-clicked'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { RenderCtrlModule } from '@shared/render-ctrl/index.module'

import { ProjectDetailComponent } from './components/detail/detail.component'
import { SessionsListComponent } from './components/sessions-list/index.component'
import { ShareComponent } from './components/share/share.component'

const routes: Routes = [{ path: '', component: ProjectDetailComponent }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    FlexLayoutModule,

    NotImplementedModule,
    KernelModule,
    LoadingWhenClickedModule,
    OurAvatarModule,
    RenderCtrlModule
  ],
  exports: [],
  declarations: [SessionsListComponent, ProjectDetailComponent]
})
export class ProjectModule {}

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule
} from '@angular/material'
import { RouterModule, Routes } from '@angular/router'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { KernelModule } from '@shared/kernel/kernel.module'
import { LoadingWhenClickedModule } from '@shared/loading-when-clicked'
import { NotImplementedModule } from '@shared/not-implemented/index.module'
import { RenderCtrlModule } from '@shared/render-ctrl/index.module'
import { ProjectDetailComponent } from './components/detail/detail.component'
import { SessionsListComponent } from './components/sessions-list/index.component'

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

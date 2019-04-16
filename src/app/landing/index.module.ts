import { CommonModule } from '@angular/common'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material'
import { RouterModule, Routes } from '@angular/router'
import { HeaderModule } from '@shared/header/index.module'
import {
  LandingComponent,
  VideoComponent
} from './components/container/index.component'

const routes: Routes = [{ path: '', component: LandingComponent }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    HeaderModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [],
  declarations: [LandingComponent, VideoComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LandingModule {}

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material'

import { HeaderModule } from '@shared/header/index.module'
import { LandingComponent } from './components/container/index.component'

const routes: Routes = [{ path: '', component: LandingComponent }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    HeaderModule,
    MatButtonModule
  ],
  exports: [],
  declarations: [LandingComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LandingModule {}

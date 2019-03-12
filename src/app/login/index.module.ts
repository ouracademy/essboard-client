import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms'
import { LoadingWhenClickedModule } from '@shared/loading-when-clicked'
import { LayoutAuthModule } from '../layouts/auth/layout.component'

import { LoginComponent } from './components/index/index.component'
import { PreventOfflineModule } from '@shared/prevent-when-offline/index.module'

const routes: Routes = [{ path: '', component: LoginComponent }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,

    LayoutAuthModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingWhenClickedModule,
    PreventOfflineModule
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}

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

import { LayoutAuthModule } from '../layouts/auth/layout.component'
import { CommonAppModule } from '@shared/common'
import { LoginComponent } from './components/index/index.component'

const routes: Routes = [{ path: '', component: LoginComponent }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    CommonAppModule,
    LayoutAuthModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule {}

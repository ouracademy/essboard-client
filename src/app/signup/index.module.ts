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

import { SignupComponent } from './components/index/index.component'

const routes: Routes = [{ path: '', component: SignupComponent }]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,

    LayoutAuthModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [],
  declarations: [SignupComponent],
  providers: []
})
export class SignupModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
} from '@angular/material'

import { indexRouting } from './index.routing'
import { UserService } from './services/user.service'
import { UserSocketService } from './services/user-socket.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    indexRouting,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule
  ],
  declarations: [],
  providers: [{ provide: UserService, useClass: UserSocketService }],
  exports: []
})
export class UsersModule {}

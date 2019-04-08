import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccountComponent } from './index.component'
import {
  MatIconModule,
  MatButtonModule,
  MatMenuModule
} from '@angular/material'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    OurAvatarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [AccountComponent],
  declarations: [AccountComponent]
})
export class AccountModule {}

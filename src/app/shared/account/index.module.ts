import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AccountComponent } from './index.component'
import {
  MatIconModule,
  MatButtonModule,
  MatMenuModule
} from '@angular/material'

@NgModule({
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  exports: [AccountComponent],
  declarations: [AccountComponent]
})
export class AccountModule {}

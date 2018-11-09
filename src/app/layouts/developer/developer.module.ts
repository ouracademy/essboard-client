import { NgModule } from '@angular/core'
import {
  MatToolbarModule,
  MatListModule,
  MatIconModule
} from '@angular/material'
import { LayoutSettingsComponent } from './index'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [MatToolbarModule, MatListModule, MatIconModule, CommonModule],
  declarations: [LayoutSettingsComponent]
})
export class DeveloperModule {}

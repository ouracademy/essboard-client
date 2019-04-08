import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { HeaderComponent } from './index.component'
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
  imports: [CommonModule, FlexLayoutModule, RouterModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}

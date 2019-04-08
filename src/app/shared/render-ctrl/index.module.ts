import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OurRenderCtrlComponent } from './index.component'
import { MatButtonModule } from '@angular/material'
@NgModule({
  imports: [CommonModule, MatButtonModule],
  exports: [OurRenderCtrlComponent],
  declarations: [OurRenderCtrlComponent]
})
export class RenderCtrlModule {}

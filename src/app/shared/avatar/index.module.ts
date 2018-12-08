import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OurAvatarComponent } from './index.component'
import { AvatarModule } from 'ngx-avatar'
@NgModule({
  imports: [CommonModule, AvatarModule],
  exports: [OurAvatarComponent],
  declarations: [OurAvatarComponent]
})
export class OurAvatarModule {}

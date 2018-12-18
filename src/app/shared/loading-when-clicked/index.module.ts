import { NgModule } from '@angular/core'
import { LoadingWhenClickedDirective } from './index.directive'
import { LoadingClickService } from './index.service'

@NgModule({
  imports: [],
  exports: [LoadingWhenClickedDirective],
  providers: [LoadingClickService],
  declarations: [LoadingWhenClickedDirective]
})
export class LoadingWhenClickedModule {}

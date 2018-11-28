import { Component, Input } from '@angular/core'
import {
  AlphaTemplate,
  StateTemplate
} from 'app/sessions/components/detail-alpha/kernel'
import { KernelService } from '@core/kernel-knowledge.service'

@Component({
  selector: 'state-card-view',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class StateCardViewComponent {
  @Input()
  state: StateTemplate
  @Input()
  alpha: AlphaTemplate

  constructor(private kernel: KernelService) {}

  // get cardCheckpoints() {
  //   return this.checkpoints.pipe(
  //     map(checkpoints => checkpoints.filter(x => x.isVisibleInCard))
  //   )
  // }

  // get checkpoints() {
  //   return this.kernel.getCheckpoints(this.id)
  // }
}

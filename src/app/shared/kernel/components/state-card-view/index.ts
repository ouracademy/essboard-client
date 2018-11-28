import { Component, Input } from '@angular/core'
import {
  AlphaTemplate,
  StateTemplate,
  CheckpointTemplate
} from 'app/sessions/components/detail-alpha/kernel'

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

  get cardCheckpoints(): CheckpointTemplate[] {
    return this.state.checklist.filter(x => x.isVisibleInCard)
  }
}

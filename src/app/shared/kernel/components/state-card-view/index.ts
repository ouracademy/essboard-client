import { Component, Input } from '@angular/core'
import {
  StateTemplate,
  AlphaTemplate
} from 'app/sessions/components/detail-alpha/index.component'

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
}

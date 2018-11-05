import { Component, Input } from '@angular/core'
import { State } from 'app/sessions/components/setCurrentState/index.component'

@Component({
  selector: 'state-card-view',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class StateCardViewComponent {
  @Input()
  state: State
  @Input()
  area: string
}

import { Component, Input, EventEmitter, Output } from '@angular/core'
import {
  AlphaTemplate,
  StateTemplate
} from 'app/sessions/components/detail-alpha/kernel'

@Component({
  selector: 'alpha-card',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class AlphaCardComponent {
  @Input()
  alpha: AlphaTemplate
  @Input()
  states: any[] = []
  @Output()
  onChooseState = new EventEmitter<StateTemplate>()

  selectedState: StateTemplate = null

  select(template: StateTemplate) {
    this.onChooseState.emit(template)
  }

  isSelected(state: StateTemplate) {
    return state === this.selectedState
  }

  getClass(stateTemplate: StateTemplate) {
    const state = this.getState(stateTemplate)
    const status = state ? state.status : 'todo'
    return {
      [status]: true,
      selected: this.isSelected(stateTemplate)
    }
  }

  getState(stateTemplate: StateTemplate) {
    return this.states.find(x => x.id === stateTemplate.id)
  }
}

import { Component, Input, EventEmitter, Output } from '@angular/core'
import {
  AlphaTemplate,
  StateTemplate,
  State
} from 'app/sessions/components/setCurrentState/index.component'

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

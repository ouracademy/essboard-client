import { Component, Input, EventEmitter, Output } from '@angular/core'
import {
  AlphaTemplate,
  StateTemplate,
  State
} from 'app/sessions/components/setCurrentState/index.component'

export interface SelectedState {
  state: State
  template: StateTemplate
}

@Component({
  selector: 'alpha-card',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class AlphaCardComponent {
  @Input()
  alpha: AlphaTemplate
  @Input()
  states: State[] = []
  @Output()
  onChooseState = new EventEmitter<SelectedState>()

  selectedState: StateTemplate = null

  select(template: StateTemplate) {
    this.onChooseState.emit({ state: this.getState(template), template })
  }

  isSelected(state: StateTemplate) {
    return state === this.selectedState
  }

  getClass(stateTemplate: StateTemplate) {
    const { status = 'todo' } = this.getState(stateTemplate)

    return {
      [status]: true,
      selected: this.isSelected(stateTemplate)
    }
  }

  getState(stateTemplate: StateTemplate) {
    return this.states.find(x => x.knowledgeId === stateTemplate.id)
  }
}

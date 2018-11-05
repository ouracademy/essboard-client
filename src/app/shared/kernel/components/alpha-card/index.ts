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
  projectStates: State[] = []
  @Output()
  onChooseState = new EventEmitter<StateTemplate>()

  selectedState: StateTemplate = null

  select(state: StateTemplate) {
    this.selectedState = state
    this.onChooseState.emit(state)
  }

  isSelected(state: StateTemplate) {
    return state === this.selectedState
  }

  getClass(state: StateTemplate) {
    const projectState = this.projectStates.find(
      x => x.knowledgeId === state.id
    )

    const label = projectState ? projectState.status : 'todo'

    return {
      [label]: true,
      selected: this.isSelected(state)
    }
  }
}

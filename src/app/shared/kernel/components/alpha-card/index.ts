import { Component, Input, EventEmitter, Output } from '@angular/core'
import {
  Alpha,
  State,
  ProjectState
} from 'app/sessions/components/setCurrentState/index.component'

@Component({
  selector: 'alpha-card',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class AlphaCardComponent {
  @Input()
  alpha: Alpha
  @Input()
  projectStates: ProjectState[] = []

  @Output()
  onChooseState = new EventEmitter<State>()

  stateSelect: State = null

  select(state: State) {
    this.stateSelect = state
    this.onChooseState.emit(state)
  }

  isSelected(state: State) {
    return state === this.stateSelect
  }

  getClass(state: State) {
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

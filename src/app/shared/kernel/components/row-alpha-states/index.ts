import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'

import { Alpha } from '@no-module/models/project-kernel'
import { StateMetadata } from '@no-module/models/kernel/kernel'

@Component({
  selector: 'row-alpha-states',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class RowAlphaStates {
  @Input()
  isForSelected: boolean
  @Input()
  stateGoal: StateMetadata = null
  @Input()
  alpha: Alpha

  @Output()
  onChooseStateGoal = new EventEmitter<StateMetadata>()
  @Output()
  onNoChooseStateGoal = new EventEmitter<StateMetadata>()

  select(state) {
    this.onChooseStateGoal.emit(state)
  }
  noSelect() {
    this.onNoChooseStateGoal.emit(this.stateGoal)
  }
  isPosibleToSelect(select: StateMetadata) {
    if (this.isForSelected) {
      return (
        select === this.alpha.lastFilled || select === this.alpha.firstByFilled
      )
    } else {
      return false
    }
  }
}

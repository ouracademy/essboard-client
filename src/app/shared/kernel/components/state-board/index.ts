import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Kernel, Alpha } from '@no-module/models/project-kernel'
import { StateMetadata } from '@no-module/models/kernel/kernel'

@Component({
  selector: 'state-board',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class StateBoardComponent {
  @Input()
  alphas: any[]
  @Input()
  isForSelected: boolean
  @Input()
  statesGoal: StateMetadata[] = []
  @Output() onChooseStateGoal = new EventEmitter<StateMetadata>()
  @Output() onNoChooseStateGoal = new EventEmitter<StateMetadata>()

  getStateGoal(state: StateMetadata) {
    this.onChooseStateGoal.emit(state)
  }
  quitOfStateGoal(state: StateMetadata) {
    this.onNoChooseStateGoal.emit(state)
  }
  getStateGoalFor(alpha: Alpha) {
    return this.statesGoal.find(state => state.dimension === alpha.info)
  }
}

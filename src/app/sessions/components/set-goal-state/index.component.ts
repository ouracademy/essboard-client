import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { GoalService } from '../../services/goal.service'
import { StateMetadata } from '@no-module/models/kernel/kernel'
import { AlphaTemplate } from '../detail-alpha/kernel'
@Component({
  selector: 'set-goal-state',
  templateUrl: 'index.component.html',
  styleUrls: []
})
export class SetGoalStateComponent implements OnInit, OnChanges {
  @Input()
  alpha: AlphaTemplate
  @Input()
  states: any[]
  @Input()
  sessionId: string
  selectedState = null
  constructor(private service: GoalService) {}
  ngOnInit() {}
  ngOnChanges() {}

  setGoalState(state: StateMetadata) {
    //this.service.addStateGoal(state.identifier)
    this.selectedState = state
  }
  removeGoalState(state: StateMetadata) {
    //this.service.quitStateGoal(state.identifier)
    this.selectedState = null
  }
}

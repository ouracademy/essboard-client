import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { GoalService } from '../../services/goal.service'
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
  ngOnInit() {
    this.service.goalStates$.subscribe(r => console.log('st', r))
  }
  ngOnChanges() {}

  setGoalState(state: any) {
    this.service.save(this.sessionId, {
      alphaId: this.alpha.id,
      stateId: state.identifier
    })
    this.selectedState = state
  }
  removeGoalState(state: any) {
    this.selectedState = null
  }
  removePreviousGoalState() {}
}

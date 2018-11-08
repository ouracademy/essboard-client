import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core'
import {
  StateMetadata,
  CheckpointMetadata
} from '@no-module/models/kernel/kernel'
import { Alpha, State, Checkpoint } from '@shared/kernel/model/kernel'
import { Goal } from '@no-module/models/goal'
@Component({
  selector: 'how-reach-goal',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class HowReachGoal {
  @Input() goal: Goal
  @Output() onAddAction = new EventEmitter<any>()
  action: string = ''
  save(description) {
    /*let index = this.actions.indexOf(description);
    this.actions[index] = description;
    */
  }
  add() {
    if (this.action !== '') {
      let action = {
        name: this.action,
        stateId: this.goal.goalState.identifier
      }
      this.onAddAction.emit(action)
    }
    this.action = ''
  }
  delete(workItem) {
    /*
    let index = this.actions.indexOf(workItem);
    this.actions.splice(index, 1);*/
  }
}

import { Component, Input } from '@angular/core'
import { StateTemplate, State, CheckpointTemplate } from '../index.component'
import { SessionService } from 'app/sessions/services/session.service'
import { MatCheckboxChange } from '@angular/material/checkbox'

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent {
  @Input()
  state: State
  @Input()
  stateTemplate: StateTemplate
  constructor(private sessionService: SessionService) {}

  vote(checkpointTemplate: CheckpointTemplate, $event: MatCheckboxChange) {
    this.sessionService.voteCheckpoint(
      this.state,
      checkpointTemplate,
      $event.checked
    )
  }
}

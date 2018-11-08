import { Component, Input } from '@angular/core'
import { StateTemplate, State, CheckpointTemplate } from '../index.component'
import { SessionService } from 'app/sessions/services/session.service'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { AuthService } from '@core/auth.service'

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
  constructor(
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  vote(checkpointTemplate: CheckpointTemplate, $event: MatCheckboxChange) {
    this.sessionService.voteCheckpoint(
      this.state,
      checkpointTemplate,
      $event.checked
    )
  }
  isChecked(checkpointTemplate: CheckpointTemplate) {
    return this.state.checklist
      .find(checkpoint => checkpointTemplate.id === checkpoint.knowledgeId)
      .favorablesVotes.find(userId => userId === this.authService.user.id)
  }
}

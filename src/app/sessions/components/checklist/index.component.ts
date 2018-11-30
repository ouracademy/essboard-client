import { Component, Input, OnInit } from '@angular/core'
import { StateTemplate, CheckpointTemplate } from '../detail-alpha/kernel'
import { SessionService } from '../../services/session.service'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { AuthService } from '@core/auth.service'
import { ProjectService } from 'app/projects/services/project.service'

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent implements OnInit {
  @Input()
  stateTemplate: StateTemplate
  isReadonly: boolean

  constructor(
    private sessionService: SessionService,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  checklist: any[] = []

  ngOnInit() {
    this.sessionService.currentChecklist$.subscribe(
      checklist => (this.checklist = checklist)
    )

    this.sessionService.currentSession$.subscribe(
      session => (this.isReadonly = session.hasFinished)
    )
  }

  vote(checkpointTemplate: CheckpointTemplate, $event: MatCheckboxChange) {
    this.sessionService.voteCheckpoint(checkpointTemplate, $event.checked)
  }

  isChecked(checkpointTemplate: CheckpointTemplate) {
    return this.getVotesFromCheckpoint(checkpointTemplate).find(
      vote => vote.from === this.authService.user.id
    )
  }

  voters(checkpointTemplate: CheckpointTemplate) {
    return this.projectService.getInfoMembers(
      this.getVotesFromCheckpoint(checkpointTemplate).map(vote => vote.from)
    )
  }

  private getVotesFromCheckpoint(template: CheckpointTemplate) {
    const checkpoint = this.checklist.find(x => template.id === x.id)
    return checkpoint ? checkpoint.votes : []
  }
}

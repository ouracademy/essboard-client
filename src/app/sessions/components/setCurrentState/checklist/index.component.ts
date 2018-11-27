import { Component, Input, OnInit } from '@angular/core'
import { StateTemplate, State, CheckpointTemplate } from '../index.component'
import { SessionService } from 'app/sessions/services/session.service'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { AuthService } from '@core/auth.service'
import { ProjectService } from 'app/projects/services/project.service'

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent implements OnInit {
  _stateTemplate: StateTemplate

  @Input()
  set stateTemplate(arg: any) {
    this._stateTemplate = arg
    this.getCheckpoints(arg.id)
  }

  get stateTemplate() {
    return this._stateTemplate
  }

  constructor(
    private sessionService: SessionService,
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  checklist: any[] = []

  getCheckpoints(stateId) {
    console.log('get checklist')
    this.sessionService.checklist.subscribe(checklist => {
      console.log('hjkj')
      this.checklist = checklist
      console.log({ checklist })
    })
  }

  ngOnInit() {
    //listen changes about state
    // this.getCheckpoints()
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

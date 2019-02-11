import { Component, Input, OnInit } from '@angular/core'
import { StateTemplate, CheckpointTemplate } from '../detail-alpha/kernel'
import {
  SessionService,
  ModeStateDefinition
} from '../../services/session.service'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { AuthService } from '@core/auth.service'
import { Member } from 'app/members/members.service'
import { VotesService } from 'app/sessions/services/votes.service'

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent implements OnInit {
  @Input()
  stateTemplate: StateTemplate
  isReadonly: boolean
  checklist: any[] = []
  members: Member[] = []
  modeStateDefinition = null

  constructor(
    private sessionService: SessionService,
    private votesService: VotesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sessionService.modeStateDefinition$.subscribe(mode => {
      this.modeStateDefinition = mode
    })
    this.sessionService.currentChecklist$.subscribe(
      checklist => (this.checklist = checklist)
    )

    this.sessionService.currentSession$.subscribe(
      session => (this.isReadonly = session.hasFinished)
    )

    this.sessionService.currentMembers$.subscribe(members => {
      this.members = members
    })
  }

  getMessage(mode) {
    return mode === ModeStateDefinition.Current
      ? 'Evalue si se ha cumplido lo siguiente'
      : 'Seleccione que elementos se debe cumplir para la siguiente sesión'
  }

  vote(checkpointTemplate: CheckpointTemplate, $event: MatCheckboxChange) {
    this.votesService.voteCheckpoint(checkpointTemplate, $event.checked)
  }

  isChecked(checkpointTemplate: CheckpointTemplate) {
    return this.getVotesFromCheckpoint(checkpointTemplate).find(
      vote => vote.from === this.authService.user.id
    )
  }

  voters(checkpointTemplate: CheckpointTemplate) {
    const voters = this.getVotesFromCheckpoint(checkpointTemplate).map(
      vote => vote.from
    )
    return this.getMembersInformation(voters)
  }

  private getMembersInformation(voters) {
    return voters.map(voter => this.members.find(member => member.id === voter))
  }

  private getVotesFromCheckpoint(template: CheckpointTemplate) {
    const checkpoint = this.checklist.find(x => template.id === x.id)
    return checkpoint ? checkpoint.votes : []
  }
}

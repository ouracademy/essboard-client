import { Component, Input, OnInit } from '@angular/core'
import { StateTemplate, CheckpointTemplate } from '../detail-alpha/kernel'
import { SessionService } from '../../services/session.service'
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

  constructor(
    private sessionService: SessionService,
    private votesService: VotesService,
    private authService: AuthService
  ) {}

  checklist: any[] = []
  members: Member[] = []

  ngOnInit() {
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

import { Component, Input, OnInit } from '@angular/core'
import { StateTemplate, CheckpointTemplate } from '../detail-alpha/kernel'
import { SessionService } from '../../services/session.service'
import { AuthService } from '@core/auth.service'
import { Member } from 'app/members/members.service'
import { VotesService } from 'app/sessions/services/votes.service'
import { MatButtonToggleChange } from '@angular/material'

interface Checkpoint {
  id: string
  opinions: Opinion[]
}

interface Opinion {
  from: string // user
  is: string
}

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent implements OnInit {
  @Input()
  stateTemplate: StateTemplate
  isReadonly: boolean
  checklist: Checkpoint[] = []
  members: Member[] = []

  constructor(
    private sessionService: SessionService,
    private votesService: VotesService,
    private authService: AuthService
  ) {}

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

  emitOpinion(
    checkpointTemplate: CheckpointTemplate,
    $event: MatButtonToggleChange
  ) {
    this.votesService.emitOpinion(checkpointTemplate, $event.value)
  }

  opinionOf(checkpointTemplate: CheckpointTemplate) {
    const myOpinion = this.opinionsOf(checkpointTemplate).find(
      vote => vote.from === this.authService.user.id
    )

    return myOpinion ? myOpinion.is : 'nothing'
  }

  reviewers(checkpointTemplate: CheckpointTemplate) {
    const opinions = this.opinionsOf(checkpointTemplate)
    return opinions.map(x => this.members.find(member => member.id === x.from))
  }

  private opinionsOf(template: CheckpointTemplate): Opinion[] {
    const checkpoint = this.checklist.find(x => template.id === x.id)
    return checkpoint ? checkpoint.opinions : []
  }
}

import { Component, Input, OnInit, OnChanges } from '@angular/core'
import { StateTemplate, CheckpointTemplate } from '../detail-alpha/kernel'
import { SessionService } from '../../services/session.service'
import { Member } from 'app/members/members.service'
import { VotesService, Opinion } from 'app/sessions/services/votes.service'
import { MatButtonToggleChange } from '@angular/material'

interface Checkpoint {
  id: string
  opinions: Opinion[]
  is: string
}

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent implements OnInit, OnChanges {
  @Input()
  stateTemplate: StateTemplate
  isReadonly: boolean
  checklist: Checkpoint[] = []
  members: Member[] = []
  myOpinions: Opinion[] = []

  icons = {
    goal: 'golf_course',
    done: 'check_circle_outline',
    'time-to-debate': 'priority_high',
    nothing: 'indeterminate_check_box'
  }

  constructor(
    private sessionService: SessionService,
    private votesService: VotesService
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
  ngOnChanges() {
    this.votesService.opinions(this.stateTemplate).then(opinions => {
      this.myOpinions = opinions
    })
  }

  emitOpinion(
    checkpointTemplate: CheckpointTemplate,
    $event: MatButtonToggleChange
  ) {
    this.votesService.emitOpinion(checkpointTemplate, $event.value)
  }

  opinionOf(checkpointTemplate: CheckpointTemplate) {
    const myOpinion = this.myOpinions.find(x => checkpointTemplate.id === x.for)
    return myOpinion ? myOpinion.is : 'nothing'
  }

  opinionOfTeam(template: CheckpointTemplate) {
    const checkpoint = this.checkpointOf(template)
    return checkpoint ? this.icons[checkpoint.is] : this.icons.nothing
  }

  reviewers(checkpointTemplate: CheckpointTemplate) {
    const opinions = this.opinionsOf(checkpointTemplate)
    return opinions.map(x => this.members.find(member => member.id === x.from))
  }

  private opinionsOf(template: CheckpointTemplate): Opinion[] {
    const checkpoint = this.checkpointOf(template)
    return checkpoint ? checkpoint.opinions : []
  }

  private checkpointOf(template: CheckpointTemplate) {
    return this.checklist.find(x => template.id === x.id)
  }
}

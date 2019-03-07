import { Component, Input, OnInit, OnChanges } from '@angular/core'
import { StateTemplate, CheckpointTemplate } from '../detail-alpha/kernel'
import { SessionService } from '../../services/session.service'
import { Member } from 'app/members/members.service'
import { VotesService, Opinion } from 'app/sessions/services/votes.service'
import {
  MatButtonToggleChange,
  MatDialog,
  MatDialogRef
} from '@angular/material'
import { CheckDetailComponent } from '../check-detail/index.component'

interface Checkpoint {
  id: string
  opinions: Opinion[]
  is: string
}

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss']
})
export class ChecklistComponent implements OnInit, OnChanges {
  @Input()
  stateTemplate: StateTemplate
  isReadonly: boolean
  checklist: Checkpoint[] = []
  members: Member[] = []
  myOpinions: Opinion[] = []

  currentCheckDialog: {
    ref: MatDialogRef<CheckDetailComponent>
    template: CheckpointTemplate
  } = null

  icons = {
    goal: 'golf_course',
    done: 'check_circle_outline',
    'time-to-debate': 'priority_high',
    nothing: 'indeterminate_check_box'
  }

  constructor(
    private sessionService: SessionService,
    private votesService: VotesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sessionService.currentChecklist$.subscribe(checklist => {
      this.checklist = checklist
      if (this.currentCheckDialog) {
        this.currentCheckDialog.ref.componentInstance.updateReviewers(
          this.reviewers(this.currentCheckDialog.template)
        )
      }
    })

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
    return opinions.map(x => ({
      user: this.members.find(member => member.id === x.from),
      opinion: x.is
    }))
  }

  private opinionsOf(template: CheckpointTemplate): Opinion[] {
    const checkpoint = this.checkpointOf(template)
    return checkpoint ? checkpoint.opinions : []
  }

  private checkpointOf(template: CheckpointTemplate) {
    return this.checklist.find(x => template.id === x.id)
  }

  seeDetail(template: CheckpointTemplate) {
    this.currentCheckDialog = {
      template: template,
      ref: this.dialog.open(CheckDetailComponent, {
        width: '50vw',
        disableClose: true,
        hasBackdrop: true,
        data: {
          members: this.members,
          template: template,
          myOpinion: this.opinionOf(template),
          reviewers: this.reviewers(template)
        }
      })
    }
    this.dialog.openDialogs.pop()
    this.sessionService.statusChat$.next('openWithModal')

    this.currentCheckDialog.ref.afterClosed().subscribe(result => {
      this.currentCheckDialog = null
    })
  }
}

import { Component, OnInit, Inject } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { MAT_DIALOG_DATA } from '@angular/material'
import { AuthService } from '@core/auth.service'
import { distanceInWordsToNow } from 'date-fns'
const esLocale = require('date-fns/locale/es')

@Component({
  selector: 'check-detail',
  templateUrl: 'index.component.html',
  styles: [
    `
      .complement {
        flex: 1 1;
      }
      .comment {
        margin-bottom: 15px;
      }
      .comment__text {
        margin-bottom: 8px;
        background: #f2f3f5;
        border-radius: 10px;
        padding: 10px;
      }
    `
  ]
})
export class CheckDetailComponent implements OnInit {
  reviewers = null
  checkpointTemplate = null
  icons = {
    goal: 'golf_course',
    done: 'check_circle_outline',
    'time-to-debate': 'priority_high',
    nothing: 'indeterminate_check_box'
  }
  comments = []
  members
  me = null
  constructor(
    private sessionService: SessionService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      members: any[]
      template: any
      myOpinion: any
      reviewers: any
    }
  ) {
    this.members = data.members
    this.reviewers = data.reviewers
    this.checkpointTemplate = data.template
    this.me = this.auth.user
  }

  ngOnInit() {
    this.sessionService
      .getComments(this.checkpointTemplate['id'])
      .subscribe(comments => {
        this.comments = comments['data'].map(x => ({
          user: this.members.find(member => member.id === x.from),
          timeAgo: distanceInWordsToNow(x.updatedAt, { locale: esLocale }),
          ...x
        }))
      })
  }

  updateReviewers(reviewers) {
    this.reviewers = reviewers
  }
  saveComment(inputElement) {
    this.sessionService.saveComment({
      checkpoint: this.checkpointTemplate.id,
      text: inputElement.value
    })
    inputElement.value = ''
  }
  deleteComment(comment) {
    this.sessionService.deleteComment(comment)
  }
  activateEditable(comment) {
    comment['isEditable'] = true
  }
  desactivateEditable(comment) {
    comment['isEditable'] = false
  }
  editComment(comment, text) {
    this.sessionService.updateComment(comment._id, text)
  }
}

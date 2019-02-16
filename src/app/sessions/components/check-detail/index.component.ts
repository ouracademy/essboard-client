import { Component, OnInit, Inject } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'check-detail',
  templateUrl: 'index.component.html'
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
  comments = [{ from: 'arthur', says: 'Esto demorara dos semanas' }]
  constructor(
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA)
    public data: { template: any; myOpinion: any; reviewers: any }
  ) {
    this.reviewers = data.reviewers
    this.checkpointTemplate = data.template
  }

  ngOnInit() {}

  updateReviewers(reviewers) {
    this.reviewers = reviewers
  }
}

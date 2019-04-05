import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { SessionService } from 'app/sessions/services/session.service'
import { DataList } from '@shared/render-ctrl/index.component'

@Component({
  selector: 'sessions-list',
  templateUrl: 'index.component.html'
})
export class SessionsListComponent implements OnDestroy, DataList {
  sessions = []

  isLoaded$: BehaviorSubject<boolean>
  isEmpty$: BehaviorSubject<boolean>

  @Input('projectId')
  set projectId(projectId) {
    this.sessionsService.getSessions(projectId).subscribe(sessions => {
      this.sessions = sessions
      this.isLoaded$.next(true)
      this.isEmpty$.next(sessions.length === 0)
    })
  }

  constructor(public sessionsService: SessionService) {
    this.isLoaded$ = new BehaviorSubject(false)
    this.isEmpty$ = new BehaviorSubject(true)
  }

  ngOnDestroy() {
    this.isLoaded$.unsubscribe()
    this.isEmpty$.unsubscribe()
  }
}

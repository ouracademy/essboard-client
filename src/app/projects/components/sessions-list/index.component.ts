import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { SessionService } from 'app/sessions/services/session.service'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs'

import { DataList } from '@shared/render-ctrl/index.component'
@Component({
  selector: 'sessions-list',
  templateUrl: 'index.component.html'
})
export class SessionsListComponent implements DataList {
  sessions = []

  loaded$: Subject<{}>
  isEmpty$: Subject<{}>
  @Input('projectId')
  set projectId(projectId) {
    this.sessionsService.getSessions(projectId).subscribe(sessions => {
      this.sessions = sessions
      this.loaded$.next(true)
      this.isEmpty$.next(sessions.length === 0)
    })
  }

  constructor(private router: Router, public sessionsService: SessionService) {
    this.loaded$ = new Subject()
    this.isEmpty$ = new Subject()
  }

  goSession(session) {
    this.router.navigate(['/me/sessions', session.id])
  }
}

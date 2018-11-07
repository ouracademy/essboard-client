import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from 'app/sessions/services/session.service'

@Component({
  selector: 'sessions-list',
  templateUrl: 'index.component.html'
})
export class SessionsListComponent {
  sessions = []
  @Input('projectId')
  set projectId(projectId) {
    this.sessionsService
      .getSessions(projectId)
      .subscribe(sessions => (this.sessions = sessions))
  }

  constructor(private router: Router, public sessionsService: SessionService) {}

  goSession(session) {
    this.router.navigate(['/me/sessions', session.id])
  }
}

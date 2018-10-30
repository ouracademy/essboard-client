import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from 'app/sessions/services/session.service'

@Component({
  selector: 'sessions-list',
  templateUrl: 'index.component.html'
})
export class SessionsListComponent {
  @Input()
  projectId: any

  constructor(private router: Router, public sessionsService: SessionService) {}

  ngOnInit() {}

  ngOnChanges() {
    console.log('change id', this.projectId)
    this.sessionsService.getSessions(this.projectId)
  }

  goSession(session) {
    this.router.navigate(['/me/sessions', session._id])
  }
}

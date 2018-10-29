import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'

@Component({
  selector: 'sessions-list',
  templateUrl: 'index.component.html'
})
export class SessionsListComponent {
  @Input()
  sessions: Session[]

  constructor(private router: Router) {}

  goSession(session) {
    this.router.navigate(['/me/sessions', session.id])
  }
}

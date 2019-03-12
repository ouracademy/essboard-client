import { Component, OnInit } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { Session } from '@models/project'
import { Observable } from 'rxjs'

@Component({
  selector: 'radiator-information',
  template: `
    <div class="content-tab">
      <div class="row middle-xs center-xs">
        <h2 class="primary">Mira como va tu proyecto</h2>
      </div>
      <div class="row center-xs">
        <app-radar-chart
          class="col-xs-12 col-md-8"
          [session]="session | async"
        ></app-radar-chart>
      </div>
    </div>
  `
})
export class RadiatorInformationComponent implements OnInit {
  session: Observable<Session>

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.session = this.sessionService.currentSession$
  }
}

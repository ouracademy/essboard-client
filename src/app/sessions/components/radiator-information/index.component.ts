import { Component, OnInit } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { Session } from '@shared/no-module/models/project'

@Component({
  selector: 'radiator-information',
  template: `
    <div class="content-tab">
      <div class="row middle-xs center-xs">
        <h2 class="title">Mira como va tu proyecto</h2>
      </div>
      <div class="row center-xs">
        <app-radar-chart
          class="col-xs-12 col-md-6"
          [sessionId]="null"
          level="specific"
        ></app-radar-chart>
      </div>
    </div>
  `
})
export class RadiatorInformationComponent implements OnInit {
  session: Session

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.session = null
  }
}

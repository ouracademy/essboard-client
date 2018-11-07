import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CanDeactivate } from '@angular/router'

import { SessionComponent } from '../components/index.component'
import { SessionService } from './session.service'
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<SessionComponent> {
  constructor(private sessionService: SessionService) {}

  canDeactivate(component: SessionComponent): Observable<any> {
    return this.sessionService.leaveSessionChannel(component.session)
  }
}

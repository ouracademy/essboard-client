import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CanDeactivate } from '@angular/router'

export interface CanLeaveChannel {
  leaveChannel(): Observable<any>
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanLeaveChannel> {
  canDeactivate(component: CanLeaveChannel): Observable<any> {
    return component.leaveChannel()
  }
}

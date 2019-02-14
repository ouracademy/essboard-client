import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { SessionService } from './session.service'
import { map, flatMap } from 'rxjs/operators'
import { of, Subject } from 'rxjs'

@Injectable()
export class EvaluationService {
  service: any
  evaluationStatus: Subject<boolean>

  constructor(
    private socketService: SocketService,
    private sessionService: SessionService
  ) {
    this.service = this.socketService.getService('evaluations')
    this.evaluationStatus = new Subject<boolean>()

    this.service.on('created', data => this.evaluationStatus.next(true))
    this.service.on('removed', data => this.evaluationStatus.next(false))
  }

  startNewOne() {
    this.sessionService.currentSession$.subscribe(session => {
      this.service.create({ projectId: session.projectId })
    })
  }

  stop() {
    this.sessionService.currentSession$.toPromise().then(session => {
      this.socketService.getService('evaluations').remove(session.projectId)
    })
  }
}

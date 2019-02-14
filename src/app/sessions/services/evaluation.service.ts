import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { SessionService } from './session.service'
import { Observable } from 'rxjs'
import { Session } from '@shared/no-module/models/project'

interface Status {
  isEvaluating: boolean
}

@Injectable()
export class EvaluationService {
  service: any
  session: Session

  constructor(
    private socketService: SocketService,
    private sessionService: SessionService
  ) {
    this.service = this.socketService.getService('evaluations')

    this.sessionService.currentSession$.subscribe(
      session => (this.session = session)
    )
  }

  getEvalutionStatus(): Observable<Status> {
    return this.service.watch().get(this.session.projectId)
  }

  startNewOne() {
    this.service.create({ projectId: this.session.projectId })
  }

  stop() {
    this.service.patch(this.session.projectId, { evaluate: false })
  }
}

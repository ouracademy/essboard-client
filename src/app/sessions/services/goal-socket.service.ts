import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { GoalService } from './goal.service'
import { SocketService } from '@core/socket.service'
import { SessionService } from './session.service'
import { map } from 'rxjs/operators'

@Injectable()
export class GoalSocketService extends GoalService {
  service: any

  constructor(
    public socketService: SocketService,
    private sessionService: SessionService,
    private router: Router
  ) {
    super()
    this.service = this.socketService.getService('goals')
    this.sessionService.currentSession$.subscribe(session => {
      this.goalStates$ = this.service
        .watch()
        .find({
          query: {
            session: session.id
          }
        })
        .pipe(map(response => response['data']))
    })
  }

  save(sessionId, { alphaId, stateId }) {
    console.log('save goal')
  }
  getList(sessionId: any) {
    throw new Error('Method not implemented.')
  }
  remove(stateGoalId: number) {
    throw new Error('Method not implemented.')
  }
  addAction(action: string, stateId: number) {
    throw new Error('Method not implemented.')
  }
}

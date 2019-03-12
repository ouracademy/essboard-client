import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { SessionService } from './session.service'
import {
  CheckpointTemplate,
  AlphaTemplate,
  StateTemplate
} from '../components/detail-alpha/kernel'
import { EvaluationService } from './evaluation.service'
import { Subject, combineLatest } from 'rxjs'
import { Session } from '@models/project'
import { AuthService } from '@core/auth.service'

export interface Opinion {
  from: string // user
  for: string // checkpoint
  is: string
}

@Injectable()
export class VotesService {
  session: Session
  service: any
  onCreated$: Subject<any>

  constructor(
    private socketService: SocketService,
    private sessionService: SessionService,
    private evaluationService: EvaluationService,
    private auth: AuthService
  ) {
    this.service = this.socketService.getService('votes')
    this.sessionService.currentSession$.subscribe(
      session => (this.session = session)
    )

    this.onCreated$ = new Subject<any>()

    this.service.on('created', ({ for: checkpoint }) => {
      console.log('oncreated')
      this.onCreated$.next(checkpoint)
    })

    combineLatest(
      this.evaluationService.getEvalutionStatus(),
      this.onCreated$
    ).subscribe(([status, checkpoint]) => {
      if (!status.isEvaluating) {
        const currentAlpha = this.sessionService.currentAlpha$.getValue()
        const currentState = this.sessionService.currentState$.getValue()

        this.sessionService.selectedAlpha = currentAlpha
        if (this.canGetAlpha(currentAlpha, checkpoint)) {
        }
        if (this.canGetState(currentState, checkpoint)) {
          this.sessionService.selectedState = currentState
        }
      }
    })
  }

  emitOpinion(checkpointTemplate: CheckpointTemplate, opinion: string) {
    this.service.create({
      for: checkpointTemplate.id,
      is: opinion,
      session: this.session.id,
      project: this.session.projectId
    })
  }
  private canGetAlpha(currentAlpha: AlphaTemplate, checkpoint: string) {
    return parseInt(currentAlpha.id, 10) === this.getAlphaFrom(checkpoint)
  }

  private canGetState(currentState: StateTemplate, checkpoint: string) {
    return (
      currentState &&
      parseInt(currentState.id, 10) === this.getStateFrom(checkpoint)
    )
  }
  private getAlphaFrom(checkpoint) {
    return Math.floor(this.getStateFrom(checkpoint) / 10)
  }

  private getStateFrom(checkpoint: string): number {
    return parseInt(checkpoint.split('-')[0], 10)
  }

  opinions(state: StateTemplate): Promise<Opinion[]> {
    return this.service
      .find({
        query: {
          project: this.session.projectId,
          createdAt: {
            $lte: this.session.hasFinished ? this.session.endDate : new Date()
          },
          from: this.auth.user.id
        }
      })
      .then((opinions: Opinion[]) =>
        opinions.filter(x => this.getStateFrom(x.for) === +state.id)
      )
  }
}

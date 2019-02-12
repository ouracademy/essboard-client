import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { SessionService } from './session.service'
import {
  CheckpointTemplate,
  AlphaTemplate,
  StateTemplate
} from '../components/detail-alpha/kernel'

@Injectable()
export class VotesService {
  session: any
  service: any

  constructor(
    public socketService: SocketService,
    private sessionService: SessionService
  ) {
    this.service = this.socketService.getService('votes')
    this.sessionService.currentSession$.subscribe(
      session => (this.session = session)
    )
    this.service.on('created', ({ for: checkpoint }) => {
      const currentAlpha = this.sessionService.currentAlpha$.getValue()
      const currentState = this.sessionService.currentState$.getValue()

      if (this.canGetAlpha(currentAlpha, checkpoint)) {
        this.sessionService.selectedAlpha = currentAlpha
      }
      if (this.canGetState(currentState, checkpoint)) {
        this.sessionService.selectedState = currentState
      }
    })
  }

  emitOpinion(checkpointTemplate: CheckpointTemplate, opinion: string) {
    this.socketService.getService('votes').create({
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
}

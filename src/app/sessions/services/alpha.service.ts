import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { SocketService } from '@core/socket.service'
import { KernelService } from '@core/kernel-knowledge.service'

@Injectable()
export class AlphaProjectService {
  alphaProject$: Subject<any>
  service: any
  channelSubscriptions: any

  constructor(
    public socketService: SocketService,
    public kernelKnowledgeService: KernelService
  ) {
    this.service = this.socketService.getService('alphas')
    this.service.on('patched', session => this.onPatched(session))
    this.alphaProject$ = new Subject()
  }

  getProjectAlpha(sessionId: string, alphaId) {
    this.service
      .find({ query: { sessionId, knowledgeId: alphaId } })
      .then((item: any) => {
        this.alphaProject$.next(item)
        console.log(item)
      })
  }

  private onPatched(session: any) {
    this.alphaProject$.next(session)
  }
}

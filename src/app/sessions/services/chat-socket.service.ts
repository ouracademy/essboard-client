import { Injectable } from '@angular/core'
import { Message } from '../model/messages'
import { Subject } from 'rxjs/Subject'
import { ChatService } from './chat.service'
import { SocketService } from '@core/socket.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ChatSocketService extends ChatService {
  service: any

  constructor(public socketService: SocketService) {
    super()
    this.service = this.socketService.getService('chats')
  }

  messages$(sessionId): Observable<any[]> {
    return this.service
      .watch({ listStrategy: 'always' })
      .find({ query: { sessionId } })
  }

  addMessage(text: string, sessionId: string) {
    this.service.create({ text, sessionId })
  }
}

import { Injectable } from '@angular/core'
import { Message } from '../model/messages'
import { Subject } from 'rxjs/Subject'
import { ChatService } from './chat.service'
import { SocketService } from '@core/socket.service'

@Injectable()
export class ChatSocketService extends ChatService {
  comments: Message[] = []
  messages$ = new Subject<any>()
  service: any

  constructor(public socketService: SocketService) {
    super()
    this.service = this.socketService.getService('chats')
    this.service.on('created', this.onCreated)
  }

  getMessages(sessionId) {
    this.service.find({ query: { sessionId } }).then(result => {
      this.comments = result.data.map(this.transform)
      this.messages$.next(this.comments)
    })
  }

  addMessage(text: string, sessionId: string) {
    this.service.create({ text, sessionId })
  }

  onCreated = (newItem: any) => {
    this.comments.push(this.transform(newItem))
    this.messages$.next(this.comments)
  }

  private transform(obj: any) {
    return new Message(obj.text, obj.userName)
  }
}

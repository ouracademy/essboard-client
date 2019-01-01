import { Injectable, OnDestroy } from '@angular/core'
import { ChatService } from './chat.service'
import { SocketService } from '@core/socket.service'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class ChatSocketService extends ChatService {
  service: any

  constructor(public socketService: SocketService) {
    super()

    this.service = this.socketService.getService('chats')
    this.service.on('newMessage', m => {
      this.response$.next({
        data: [...this.response$.getValue().data, m],
        scrollToBottom: true,
        skip: 0,
        canPaginate: this.response$.getValue().canPaginate
      })
    })
  }

  set query({ sessionId, skip: skipQuery = 0 }) {
    this.service
      .find({ query: { sessionId, $skip: skipQuery } })
      .then(({ data, limit, skip, total }) => {
        skip = skip + limit
        this.response$.next({
          data: [...data.reverse(), ...this.response$.getValue().data],
          scrollToBottom: skipQuery === 0,
          skip,
          canPaginate: skip <= total
        })
      })
  }

  addMessage(text: string, sessionId: string) {
    this.service.create({ text, sessionId })
  }
  init() {
    this.response$ = new BehaviorSubject({
      data: [],
      scrollToBottom: true,
      skip: 0,
      canPaginate: true
    })
  }
  clear() {
    this.response$.unsubscribe()
  }
}

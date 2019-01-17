import { BehaviorSubject } from 'rxjs'

export abstract class ChatService {
  response$: BehaviorSubject<{
    data: any[]
    scrollToBottom: boolean
    skip: number
    canPaginate: boolean
  }>
  query: any
  abstract addMessage(text, sessionId)
  abstract init()
}

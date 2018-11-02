import { Subject } from 'rxjs'

export abstract class ChatService {
  messages$: Subject<any>
  abstract getMessages(sessionId)
  abstract addMessage(text, sessionId)
}

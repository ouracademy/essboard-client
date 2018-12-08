import { Observable } from 'rxjs'

export abstract class ChatService {
  abstract messages$(sessionId): Observable<any[]>
  abstract addMessage(text, sessionId)
}

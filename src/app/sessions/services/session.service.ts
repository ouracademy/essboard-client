import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { Session } from '@models/project'
import { StateTemplate } from '../components/detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'
import { Member } from 'app/members/members.service'

export abstract class SessionService implements CanLeaveChannel {
  currentSession$: Observable<Session>
  abstract set selectedSession(sessionId: string)

  statusChat$: Subject<any>

  currentState$: BehaviorSubject<StateTemplate>

  currentAlpha$: BehaviorSubject<any>
  abstract set selectedAlpha(states)

  currentChecklist$: BehaviorSubject<any>
  abstract set selectedState(state: StateTemplate)

  channelSubscriptions$: Observable<any>

  currentMembers$: Observable<Member[]>

  abstract getSessions(projectId: string): Observable<Session[]>
  abstract addSession(projectId: string): Promise<any>
  abstract delete(id)
  abstract finish()

  abstract leaveChannel()

  abstract saveComment({ text, checkpoint })
  abstract getComments(checkpoint): Observable<any>
  abstract updateComment(comment, text)
  abstract deleteComment(comment)
}

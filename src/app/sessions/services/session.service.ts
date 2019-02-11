import { Observable, BehaviorSubject } from 'rxjs'
import { Session } from '@shared/no-module/models/project'
import { StateTemplate } from '../components/detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'
import { Member } from 'app/members/members.service'

export enum ModeStateDefinition {
  Current = 'current',
  Goal = 'goal'
}

export abstract class SessionService implements CanLeaveChannel {
  currentSession$: Observable<Session>
  abstract set selectedSession(sessionId: string)

  currentState$: BehaviorSubject<StateTemplate>

  currentAlpha$: BehaviorSubject<any>
  abstract set selectedAlpha(states)

  currentChecklist$: BehaviorSubject<any>
  abstract set selectedState(state: StateTemplate)

  channelSubscriptions$: Observable<any>

  currentMembers$: Observable<Member[]>

  modeStateDefinition$: BehaviorSubject<string>

  abstract getSessions(projectId: string): Observable<Session[]>
  abstract addSession(projectId: string): Promise<any>
  abstract delete(id)
  abstract finish()

  abstract leaveChannel()

  abstract markCurrentStateAsDefined()

  abstract setModeStateDefinition(modeStateDefinition)
}

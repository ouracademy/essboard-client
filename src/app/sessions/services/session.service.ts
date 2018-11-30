import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { Session } from '@shared/no-module/models/project'
import {
  AlphaTemplate,
  StateTemplate,
  CheckpointTemplate
} from '../components/detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'
export abstract class SessionService implements CanLeaveChannel {
  currentSession$: BehaviorSubject<any>
  abstract set selectedSession(sessionId: string)

  currentState$: BehaviorSubject<StateTemplate>

  currentAlpha$: BehaviorSubject<any>
  abstract set selectedAlpha(states)

  currentChecklist$: BehaviorSubject<any>
  abstract set selectedState(state: StateTemplate)

  channelSubscriptions$: Subject<any>

  abstract getSessions(projectId: string): Observable<Session[]>
  abstract addSession(projectId: string): Promise<any>
  abstract delete(id)
  abstract finish(session)

  abstract voteCheckpoint(checkpointTemplate: CheckpointTemplate, vote: boolean)
  abstract leaveChannel()
}

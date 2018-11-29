import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { Session } from '@shared/no-module/models/project'
import {
  AlphaTemplate,
  StateTemplate,
  CheckpointTemplate
} from '../components/detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'
export abstract class SessionService implements CanLeaveChannel {
  currentState$: BehaviorSubject<StateTemplate>
  currentAlpha$: BehaviorSubject<any>
  currentChecklist$: BehaviorSubject<any>
  channelSubscriptions$: Subject<any>
  abstract leaveChannel()
  abstract get selectedSession()
  abstract getSession(id: string): Observable<Session>
  abstract getSessions(projectId: string): Observable<Session[]>
  abstract addSession(projectId: string): Promise<any>
  abstract delete(id)
  abstract setStateAsWorking(id, dimensionConcept, stateName)
  abstract colaboreUsingSessionsIdInUser(idSession)
  abstract colaboreUsingUserIdInProject(idSession, idProject)
  abstract finish(session)
  abstract setSelectedAlpha(states)
  abstract getSessionChannelSubscriptions(sessionId)
  abstract set state(state: StateTemplate)
  abstract voteCheckpoint(checkpointTemplate: CheckpointTemplate, vote: boolean)
  abstract setSelectedState(state: StateTemplate)
}

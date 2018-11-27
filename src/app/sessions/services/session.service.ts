import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { Session } from '@shared/no-module/models/project'
import {
  AlphaTemplate,
  Alpha,
  StateTemplate,
  CheckpointTemplate,
  State
} from '../components/detail-alpha/index.component'

export abstract class SessionService {
  currentState$: BehaviorSubject<StateTemplate>
  channelSubscriptions$: Subject<any>
  abstract get selectedSession()
  abstract getSession(id: string): Observable<Session>
  abstract getSessions(projectId: string): Observable<Session[]>
  abstract addSession(projectId: string): Promise<any>
  abstract delete(id)
  abstract setStateAsWorking(id, dimensionConcept, stateName)
  abstract colaboreUsingSessionsIdInUser(idSession)
  abstract colaboreUsingUserIdInProject(idSession, idProject)
  abstract finish(session)
  abstract leaveSessionChannel(session: Session): Observable<any>
  abstract getAlpha(alpha: AlphaTemplate): Observable<any>
  abstract getSessionChannelSubscriptions(sessionId)
  abstract set state(state: StateTemplate)
  abstract get checklist()
  abstract voteCheckpoint(checkpointTemplate: CheckpointTemplate, vote: boolean)
}

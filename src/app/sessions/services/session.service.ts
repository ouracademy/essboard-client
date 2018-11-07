import { Subject, Observable } from 'rxjs'
import { Session } from '@shared/no-module/models/project'
import {
  AlphaTemplate,
  Alpha,
  StateTemplate,
  State
} from '../components/setCurrentState/index.component'

export abstract class SessionService {
  currentState$: Subject<any>
  channelSubscriptions$: Subject<any>
  abstract getSession(id: string): Observable<Session>
  abstract getSessions(projectId: string): Observable<Session[]>
  abstract addSession(projectId: string): Promise<any>
  abstract delete(id)
  abstract setCheckpointTo(id, dimensionId, stateId, checkpointId, condition)
  abstract setStateAsWorking(id, dimensionConcept, stateName)
  abstract setVoteToCheckpoint(
    id,
    dimensionId,
    stateId,
    checkpointId,
    condition
  )
  abstract setUnVoteToCheckpoint(
    id,
    dimensionId,
    stateId,
    checkpointId,
    condition
  )
  abstract colaboreUsingSessionsIdInUser(idSession)
  abstract colaboreUsingUserIdInProject(idSession, idProject)
  abstract finish(session)
  abstract leaveSessionChannel(session: Session): Observable<any>
  abstract getAlpha(alpha: AlphaTemplate): Observable<Alpha>
  abstract setStateToAlpha(
    alpha: Alpha,
    stateTemplate: StateTemplate,
    state: State,
    checked: any
  )
  abstract getSessionChannelSubscriptions(sessionId)
  abstract createState(
    stateTemplate: StateTemplate,
    alpha: Alpha
  ): Promise<State>
  abstract getState(stateId, previousState)
}

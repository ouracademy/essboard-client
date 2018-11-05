import { Subject, Observable } from 'rxjs'
import { Session } from '@shared/no-module/models/project'
import {
  AlphaTemplate,
  Alpha
} from '../components/setCurrentState/index.component'

export abstract class SessionService {
  currentSession$: Subject<any>
  sessions$: Subject<any>
  abstract getSession(id: string)
  abstract getSessions(projectId: string)
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
  abstract leave(session: Session): boolean | Observable<boolean>
  abstract getAlpha(alpha: AlphaTemplate): Observable<Alpha>
}

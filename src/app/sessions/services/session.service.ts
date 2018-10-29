import { Subject } from 'rxjs'

export abstract class SessionService {
  currentSession$: Subject<any>
  abstract getSession(id: string)
  abstract getSessions(projectId: string)
  abstract addSession(projectId: string, lastSessionId: string)
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
}

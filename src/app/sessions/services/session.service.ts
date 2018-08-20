
import { Observable } from 'rxjs';

export abstract class SessionService {
    currentSession: Observable<any>;
    abstract getSession(id: string);
    abstract delete(id);
    abstract setCheckpointTo(id, dimensionId, stateId, checkpointId, condition);
    abstract setStateAsWorking(id, dimensionConcept, stateName);
    abstract setVoteToCheckpoint(id, dimensionId, stateId, checkpointId, condition);
    abstract setUnVoteToCheckpoint(id, dimensionId, stateId, checkpointId, condition);
    abstract colaboreUsingSessionsIdInUser(idSession);
    abstract colaboreUsingUserIdInProject(idSession, idProject);
}
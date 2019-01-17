import { Subject } from 'rxjs'

export abstract class GoalService {
  goalStates$: Subject<any>
  abstract save(sessionId, { alphaId, stateId })
  abstract getList(sessionId)
  abstract remove(stateGoalId: number)
  abstract addAction(action: string, stateId: number)
}

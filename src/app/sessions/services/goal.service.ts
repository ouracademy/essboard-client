import { Observable } from 'rxjs';

export abstract class GoalService {
    bagGoalsObservable: Observable<any>;
    bagGoalsCompleteObservable: Observable<any>;
    abstract getBagGoals(sessionId);
    abstract addStateGoal(stateGoalId:number);
    abstract quitStateGoal(stateGoalId:number);
    abstract createBagGoal(sesionId:string);
    abstract getBagGoalsComplete(sessionId);
    abstract addAction(action: string, stateId: number);
}
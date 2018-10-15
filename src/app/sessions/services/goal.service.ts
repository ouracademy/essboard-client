import { Subject } from 'rxjs';

export abstract class GoalService {
    bagGoalsObservable: Subject<any>;
    bagGoalsCompleteObservable: Subject<any>;
    abstract getBagGoals(sessionId);
    abstract addStateGoal(stateGoalId:number);
    abstract quitStateGoal(stateGoalId:number);
    abstract createBagGoal(sesionId:string);
    abstract getBagGoalsComplete(sessionId);
    abstract addAction(action: string, stateId: number);
}
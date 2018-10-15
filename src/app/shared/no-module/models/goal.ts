
import { StateMetadata } from './kernel/kernel';
export class BagGoal {
  public id: string;
  public sessionId: string;
  public goals: Goal[] = [];
  public boardTrelloId:string;

  constructor(id: string, sessionId: string,boardTrelloId:string) {
    this.sessionId = sessionId;
    this.id = id;
    this.boardTrelloId = boardTrelloId;
  }
  addGoal(goal: Goal) {
    this.goals.push(goal);
  }

  addActions(action: any) {

  }
}


export class Goal {
  public goalState: StateMetadata;
  public actions: Action[] = [];

  constructor(goalState: StateMetadata) {
    this.goalState = goalState;
  }

  addActions(action: Action) {
    this.actions.push(action);
  }
}
export class Action {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
import { ALPHAS } from '../models/kernel/mock-kernel';
import { Goal,Action } from '../models/goal';
export class BuilderGoal {
  private static getAlphaIdFromStateId(stateId): number {
    let numberOfState = stateId % 10;
    return (stateId - numberOfState) / 10;
  }
  public static build(stateGoalId: number) {
    return new Goal(this.getState(stateGoalId));
  }
  public static buildComplete(stateGoalId: number, actions: any[]) {
    let goal = new Goal(this.getState(stateGoalId));
    for (let action of actions) {
        goal.addActions(new Action(action.name));
    }
    return goal;
  }
  private static getState(stateId: number) {
    let alphaMetadataId = this.getAlphaIdFromStateId(stateId);
    let alphaMetadata = ALPHAS.find(alpha => alpha.identifier === alphaMetadataId);
    return alphaMetadata.getState(stateId);
  }

}
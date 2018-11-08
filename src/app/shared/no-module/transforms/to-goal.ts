import { BagGoal } from '../models/goal'
import { BuilderGoal } from '../util/build-goal'
export class ToBagGoal {
  public static onlyGoalStates(source: any) {
    let bagGoal = new BagGoal(
      source._id,
      source.sessionId,
      source.boardTrelloId
    )
    for (let goal of source.goals) {
      bagGoal.addGoal(BuilderGoal.build(goal._id))
    }
    return bagGoal
  }
  public static complete(source: any) {
    let bagGoal = new BagGoal(
      source._id,
      source.sessionId,
      source.boardTrelloId
    )
    for (let goal of source.goals) {
      bagGoal.addGoal(BuilderGoal.buildComplete(goal._id, goal.actions))
    }
    return bagGoal
  }
}

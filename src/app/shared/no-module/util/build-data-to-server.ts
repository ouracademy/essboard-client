import { ALPHAS } from '../models/kernel/mock-kernel';
export class BuildDataToServer {

  public static initDimensions(): any[] {
    let dimensions = [];
    for (let alpha of ALPHAS) {
      let states = [];
      for (let state of alpha.states) {
        let checklist = [];
        for (let check of state.checkList) {
          checklist.push(
            {
              metadataId: check.identifier,
              isAchieved: false
            }
          );
        }
        states.push({
          metadataId: state.identifier,
          percent: 0,
          isAchieved: false,
          isWorking: false,
          checklist: checklist
        });
      }
      dimensions.push({
        metadataId: alpha.identifier,
        name: alpha.name,
        currentState: null,
        states: states,
        isTouched: false
      })
    }

    return dimensions;
  }

}
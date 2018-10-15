import { AlphaMetadata, StateMetadata, CheckpointMetadata } from './kernel/kernel';
import { ALPHAS } from  './kernel/mock-kernel';

export class Kernel {
  dimensions: Alpha[];

  public static empty(): Kernel {
    let kernel = new Kernel();
      for (let alphaMetadata of ALPHAS) {
        let dimension = new Alpha(alphaMetadata, false,alphaMetadata.identifier );
        for (let stateMetadata of alphaMetadata.states) {
          let state = new State(stateMetadata);
          for (let checkpoint of stateMetadata.checkList) {
            state.addCheckpoint(new Checkpoint(checkpoint));
          }
          dimension.addState(state);
        }
        kernel.addDimension(dimension);
      }
    return kernel;
  }

  constructor() {
    this.dimensions = [];
  }

  addDimension(dimension) {
    this.dimensions.push(dimension);
  }
}


export class Alpha {
  public states: State[] = [];
  public currentState: StateMetadata;
  constructor(
    public info: AlphaMetadata,
    public isTouched: boolean,
    public metadataId: number
  ) {
  }
  addStates(states) {
    this.states = states;
  }
  addState(state) {
    this.states.push(state);
    state.setDimension(this);
  }
  setCurrentState(state: StateMetadata) {
    this.currentState = state;
    /* if (!!state) {
       this.fillPreviousToCurrent();
     }/*/
  }
  getState(state:State){
    if(!!state){return this.states.find(stat => stat.info === state.info);}
    return null;
    
  }
  fillPreviousToCurrent(): void {
    this.cleanFill();
    let num = this.currentState.num;
    for (let i = 0; i <= num; i++) {
      this.states[i].isWorking = true;
    }
  }
  cleanFill() {
    for (let state of this.states) {
      state.isAchieved = false;
    }
  }
  /*
  get statesFulfilled(): StateMetadata[] {
    let cursor = this.info.states[0];
    let result = [];
    if (!!this.currentState) {
      while (cursor !== this.currentState && !!cursor) {
        result.push(cursor);
        cursor = cursor.next;
      }
      result.push(cursor);
    }
    return result;
  }*/
  get statesFulfilled(): StateMetadata[] {
    let result = [];
    for (let state of this.states) {
      if (state.isWorking === true) {
        result.push(state.info);
      }
    }
    return result;
  }

  get lastFilled() {
    return this.statesFulfilled[this.statesFulfilled.length - 1];
  }
  get firstByFilled() {
    return this.statesUnfulfilled[0];
  }

  get statesUnfulfilled(): StateMetadata[] {
    return this.diffStatesTo(this.statesFulfilled);
  }

  private diffStatesTo(a) {
    return this.info.states.filter(function (i) { return a.indexOf(i) < 0; });
  };
  getCurrentState() {
    return this.currentState;
  }
  getName() {
    return this.info.name;
  }
  getType() {
    return this.info.area.nameCSSClass;
  }
  getStates() {
    return this.info.states;
  }
  find(stateToSearch: StateMetadata) {
    return this.states.find(state => state.info === stateToSearch);
  }
  //return this.states.find(stat => stat.info === state) ? true : false;


  // clasificateState(){
  //   for (let state of this.info.states){
  //       if(this.fulfiledThisState(state)){
  //         this.achieveds.push(state);
  //       }else{
  //         this.noAchieveds.push(state);
  //       }  
  //   }
  // }

  fulfiledThisState(state: StateMetadata) {
    if (!!this.currentState) {
      return this.currentState === state;


    } else {
      return false;
    }
    // this.currentState.state

    /*  if (this.states.length != 0) {
        return this.states.find(stat => stat.info === state) ? true : false;
      }
      else {
        return false;
     }*/
  }
}

export class State {
  public checklist: Checkpoint[] = [];
  public percent: number;
  public _dimension: Alpha;
  constructor(
    public info: StateMetadata,
    public isAchieved = false,
    public isWorking = false
  ) {
  }
  addCheckpoint(checkpoint: Checkpoint) {
    this.checklist.push(checkpoint);
  }
  getPercent() {
    this.percent = 100 * this.getCheckPointAchaiveds.length / this.checklist.length;
    return this.percent;
  }
  getCheckPointAchaiveds() {
    this.checklist.find(check => check.isAchieved === true);
  }
  getX() {
    let width = 30;
    return (this.info.num - 1) * width + 55;
  }
  getY() {
    return 60;
  }
  get isFirst() {
    return this.info.dimension.states[0] === this.info;
  }

  get stateBackIsAchaived(): Boolean {
    let backState = this.info.back;
    if (backState) { 
      return this._dimension.find(backState).isWorking === true; 
    }
    return false;
  }

  setDimension(dimension) {
    this._dimension = dimension;
  }
  get dimension(): Alpha {
    return this._dimension;
  }

}

export class Checkpoint {
  votes : any[];
  constructor(
    public info: CheckpointMetadata, public isAchieved = false
  ) {
    this.isAchieved = isAchieved;
    this.votes = [];
  }
  addVotes(member,content){
    this.votes.push({"member":member,"content":content});
  }
}

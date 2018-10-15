import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { StateMetadata, CheckpointMetadata } from '@no-module/models/kernel/kernel';
import { Alpha, State, Checkpoint } from '@no-module/models/project-kernel';

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class Checklist {
  _state: State;
  @Output() onChooseCheckpoint = new EventEmitter<any>();
  @Output() onNoChooseCheckpoint = new EventEmitter<any>();
  @Input()
  set state(state: State) {
    this._state = state;
  }
  get state() {
    return this._state;
  }
  vote(checkpoint) {
    checkpoint.isAchaived = !checkpoint.isAchaived;
    this.onChooseCheckpoint.emit(checkpoint);
  }
  quitVote(checkpoint){
     this.onNoChooseCheckpoint.emit(checkpoint);
  }
  public options: any = {
    size: 20,
    fontColor: '#FFFFFF',
    border: "1px solid #d3d3d3",
    isSquare: true,
  };
}



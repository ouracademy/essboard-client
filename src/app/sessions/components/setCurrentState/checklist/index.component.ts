import { Component, Input, EventEmitter, Output } from '@angular/core'
import { StateTemplate } from '../index.component'

@Component({
  selector: 'checklist',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChecklistComponent {
  public options: any = {
    size: 20,
    fontColor: '#FFFFFF',
    border: '1px solid #d3d3d3',
    isSquare: true
  }
  _state: StateTemplate
  @Output()
  onChooseCheckpoint = new EventEmitter<any>()
  @Output()
  onNoChooseCheckpoint = new EventEmitter<any>()

  checkpointProject: { votes: any[] } = { votes: [] }

  @Input()
  projectState
  @Input()
  set state(state: StateTemplate) {
    this._state = state
  }
  get state() {
    return this._state
  }
  vote(checkpoint) {
    checkpoint.isAchaived = !checkpoint.isAchaived
    this.onChooseCheckpoint.emit(checkpoint)
  }
  quitVote(checkpoint) {
    this.onNoChooseCheckpoint.emit(checkpoint)
  }
}

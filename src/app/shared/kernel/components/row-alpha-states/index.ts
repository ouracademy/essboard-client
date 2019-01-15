import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core'

import { AlphaTemplate } from 'app/sessions/components/detail-alpha/kernel'

@Component({
  selector: 'row-alpha-states',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class RowAlphaStatesComponent implements OnChanges {
  @Input()
  isForSelected = true
  @Input()
  selectedState: any = null
  @Input()
  alpha: AlphaTemplate
  @Input() states
  doneStates = []
  todoStates = []
  spaces = []
  @Output()
  onChooseStateGoal = new EventEmitter<any>()
  @Output()
  onNoChooseStateGoal = new EventEmitter<any>()
  ngOnChanges() {
    if (this.alpha) {
      this.doneStates = []
      this.todoStates = []
      this.alpha.states.forEach(element => {
        const state = this.states.find(e => e.id === element.id)
        if (state && state.status === 'achieved') {
          this.doneStates.push(element)
        } else {
          this.todoStates.push(element)
        }
      })
      this.spaces = [...this.doneStates]

      this.spaces.push({ isEmpty: true })
      this.spaces = [...this.spaces, ...this.todoStates]
    }
  }
  select(state) {
    this.onChooseStateGoal.emit(state)
  }
  noSelect() {
    this.onNoChooseStateGoal.emit(this.selectedState)
  }
}

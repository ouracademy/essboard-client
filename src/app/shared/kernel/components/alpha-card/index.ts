import { Component, Input, EventEmitter, Output } from '@angular/core';
import { State,Alpha } from '@no-module/models/project-kernel';

@Component({
  selector: 'alpha-card',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class AlphaCard {
  @Input()
  dimension: Alpha;
  stateSelect: State = null;
  mmappingAreaWithColor = {
    'customer': '#c1ecc1',
    'solution': '#ffff99',
    'endeavor':'#d4e6f0'
  }
  @Output() onChooseState = new EventEmitter<State>();
  select(state: State) {
    this.stateSelect = state;
    this.onChooseState.emit(state);
  }
  isSelected(state: State) {
    return state === this.stateSelect;
  }
}

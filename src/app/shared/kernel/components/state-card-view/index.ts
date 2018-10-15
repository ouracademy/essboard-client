import { Component, Input } from '@angular/core';
import { StateMetadata, CheckpointMetadata } from '@no-module/models/kernel/kernel';

@Component({
  selector: 'state-card-view',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class StateCardView {
  @Input()
  state: StateMetadata;
  @Input()
  classCSS: string;
}

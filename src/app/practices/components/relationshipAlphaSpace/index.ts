import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivitySpaceMetadata } from '../../../../shared/models/kernel/kernel';
@Component({
  selector: 'rel-space-alpha-for-area',
  templateUrl: 'index.html',
  styleUrls: ['index.scss']
})
export class RelationshipSpaceAlpha implements OnInit, OnChanges {
  @Input()
  area: any;
  activitySpaces: any[] = [];
  alphas: any = [];
  statesForAlpha: any[] = [];
  constructor() { }

  ngOnInit() {
    this.activitySpaces = this.area.activitypaces;
    this.statesForAlpha = this.stateForEachAlpha();
  }
  ngOnChanges() {
    this.activitySpaces = this.area.activitypaces;
    this.statesForAlpha = this.stateForEachAlpha();
  }
  stateForEachAlpha() {
    let states: any[] = [];

    for (let alpha of this.area.dimensions) {
      for (let state of alpha.states) {
        states.push(state);
      }
    }
    return states;
  }
  getActivyAlphasRelationshipFor(activitySpace: ActivitySpaceMetadata) {
    let states = this.stateForEachAlpha();
    let options: any[] = [];
    for (let state of states) {
      options.push({
        "condition": activitySpace.implicaThisState(state),
        "state": state,
        "spcaeActivity": activitySpace
      });
    }
    return options;
  }
  showPractices(item) {
    console.log("item", item);
  }
}

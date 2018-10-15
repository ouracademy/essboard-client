import { Component, Input } from '@angular/core';
import { BagGoal } from '@no-module/models/goal';
import { GoalService } from '../../services/goal.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'how-reach-goals',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class HowReachGoals {
  @Input()
  sessionId: string;
  @Input()
  sessionNumber : number;
  bagGoals: BagGoal;
  private subscription: Subscription;
  constructor(private service: GoalService) {
  }
  ngOnInit() {
    this.subscription = this.service.bagGoalsCompleteObservable.subscribe((bagGoals: BagGoal) => {
      this.bagGoals = bagGoals;
    });
    this.service.getBagGoalsComplete(this.sessionId);
  }
  addAction(action) {
    this.service.addAction(action.name, action.stateId);
  }

}



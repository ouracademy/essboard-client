import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { Kernel } from '@shared/kernel/model/kernel';
import { BagGoal } from '@no-module/models/goal';
import { GoalService } from '../../services/goal.service';
import { Subscription } from 'rxjs/Subscription';
import { StateMetadata } from '@no-module/models/kernel/kernel';
@Component({
    selector: 'set-goal-state',
    templateUrl: 'index.component.html',
    styleUrls: []
})
export class SetGoalStateComponent implements OnInit, OnChanges {
    @Input()
    kernel: Kernel;
    @Input()
    sessionId: string;
    @Output() onBagGoals = new EventEmitter<any>();
    bagGoals: BagGoal;
    private subscription: Subscription;
    constructor(private service: GoalService) {
    }
    ngOnInit() {
        this.subscription = this.service.bagGoalsObservable.subscribe((bagGoals: BagGoal) => {
            this.bagGoals = bagGoals;
        });
        this.service.getBagGoals(this.sessionId);
        this.onBagGoals.emit(this.bagGoals);
    }
    ngOnChanges() {
        this.onBagGoals.emit(this.bagGoals);
    }

    addStateGoal(state: StateMetadata) {
        this.service.addStateGoal(state.identifier);
        this.onBagGoals.emit(this.bagGoals);
    }
    quitStateGoal(state: StateMetadata) {
        this.service.quitStateGoal(state.identifier);
        this.onBagGoals.emit(this.bagGoals);
    }
    createBagGoalsForSession() {
        this.service.createBagGoal(this.sessionId);
    }
    getStatesGoal() {
        return this.bagGoals.goals.map(goal => { return goal.goalState });
    }

}
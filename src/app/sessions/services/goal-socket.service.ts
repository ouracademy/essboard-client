import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BagGoal } from '../../../shared/models/goal';
import { ToBagGoal } from '../../../shared/transforms/to-goal';
import { Observable } from 'rxjs';
import { GoalService } from './goal.service';
import { SocketService } from '../../../shared/services/socket-io';

@Injectable()
export class GoalSocketService extends GoalService {
    bagGoalsObserver: any;
    bagGoalsCompleteObserver: any;
    bagGoals: BagGoal;
    _app: any;
    service: any;

    constructor(public socketService: SocketService, private router: Router) {
        super();
        this._app = this.socketService.init();
        this.service = this._app.service('goals');
        this.service.on('patched', (newItem) => this.onPatched(newItem));
        this.bagGoalsObservable = new Observable(observer => this.bagGoalsObserver = observer).share();
        this.bagGoalsCompleteObservable = new Observable(observer => this.bagGoalsCompleteObserver = observer).share();
    }

    private transform(obj: any) {
        return ToBagGoal.onlyGoalStates(obj);
    }
    private transformComplete(obj: any) {
        return ToBagGoal.complete(obj);
    }

    getBagGoals(sessionId) {
        this._app.authenticate().then(() => {
            this.service.find({
                query: { sessionId: sessionId },
            }, (err, items: any) => {
                if (err) return console.error(err);
                if (!!items.data[0]) {
                    this.bagGoals = this.transform(items.data[0]);
                    this.bagGoalsObserver.next(this.bagGoals);
                }
            })
        });
    }
    getBagGoalsComplete(sessionId) {
        this._app.authenticate().then(() => {
            this.service.find({
                query: { sessionId: sessionId },
            }, (err, items: any) => {
                if (err) return console.error(err);
                if (!!items.data[0]) {
                    this.bagGoals = this.transformComplete(items.data[0]);
                    this.bagGoalsCompleteObserver.next(this.bagGoals);
                }
            })
        });
    }

    createBagGoal(sessionId: string) {
        let data = { sessionId: sessionId };
        this._app.authenticate().then(() => {
            this.service.create(
                data)
                .then((result) => {
                    this.bagGoals = this.transform(result);
                    this.bagGoalsObserver.next(this.bagGoals);
                })
                .catch(function (error) {
                    console.error('Error', error);
                })
        });

    }
    addStateGoal(goalStateId: number) {
        let data = {
            '$addToSet':
            { goals: { _id: goalStateId, actions: [] } }
        };
        this.patch(this.bagGoals.id, data, {});

    }
    quitStateGoal(goalStateId: number) {
        let data = {
            '$pull':
            { goals: { _id: goalStateId } }
        };
        this.patch(this.bagGoals.id, data, {});

    }
    addAction(action: string, stateId: number) {
        let base = 'goals';
        let path = base + '.$.actions';
        let search = base + '._id';
        let params = { ["query"]: { [search]: stateId } };
        let data = {
            '$addToSet':
            { [path]: { name: action } }
        };
        this.patch(this.bagGoals.id, data, params);

    }
    private patch(id, data, params) {
        this._app.authenticate().then(() => {
            this.service.patch(
                id, data,
                params)
                .catch((error)=> {
                    console.log(error)
                })
        });

    }

    private onPatched(item: any) {
        if (this.bagGoals.id === item._id) {
            this.bagGoals = this.transform(item);
            this.bagGoalsObserver.next(this.bagGoals);
            this.bagGoalsCompleteObserver.next(this.transformComplete(item));
        }
    }

}

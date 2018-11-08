import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BagGoal } from '@no-module/models/goal'
import { ToBagGoal } from '@no-module/transforms/to-goal'
import { Observable, Subject } from 'rxjs'
import { GoalService } from './goal.service'
import { SocketService } from '@core/socket.service'

@Injectable()
export class GoalSocketService extends GoalService {
  bagGoals$: any
  bagGoalsComplete$: any
  bagGoals: BagGoal
  service: any

  constructor(public socketService: SocketService, private router: Router) {
    super()
    this.service = this.socketService.getService('goals')
    this.service.on('patched', newItem => this.onPatched(newItem))
    this.bagGoals$ = new Subject<any>()
    this.bagGoalsComplete$ = new Subject<any>()
  }

  private transform(obj: any) {
    return ToBagGoal.onlyGoalStates(obj)
  }
  private transformComplete(obj: any) {
    return ToBagGoal.complete(obj)
  }

  getBagGoals(sessionId) {
    this.service.find(
      {
        query: { sessionId: sessionId }
      },
      (err, items: any) => {
        if (err) return console.error(err)
        if (!!items.data[0]) {
          this.bagGoals = this.transform(items.data[0])
          this.bagGoals$.next(this.bagGoals)
        }
      }
    )
  }
  getBagGoalsComplete(sessionId) {
    this.service.find(
      {
        query: { sessionId: sessionId }
      },
      (err, items: any) => {
        if (err) return console.error(err)
        if (!!items.data[0]) {
          this.bagGoals = this.transformComplete(items.data[0])
          this.bagGoalsComplete$.next(this.bagGoals)
        }
      }
    )
  }

  createBagGoal(sessionId: string) {
    let data = { sessionId: sessionId }
    this.service
      .create(data)
      .then(result => {
        this.bagGoals = this.transform(result)
        this.bagGoals$.next(this.bagGoals)
      })
      .catch(function(error) {
        console.error('Error', error)
      })
  }
  addStateGoal(goalStateId: number) {
    let data = {
      $addToSet: { goals: { _id: goalStateId, actions: [] } }
    }
    this.patch(this.bagGoals.id, data, {})
  }
  quitStateGoal(goalStateId: number) {
    let data = {
      $pull: { goals: { _id: goalStateId } }
    }
    this.patch(this.bagGoals.id, data, {})
  }
  addAction(action: string, stateId: number) {
    let base = 'goals'
    let path = base + '.$.actions'
    let search = base + '._id'
    let params = { ['query']: { [search]: stateId } }
    let data = {
      $addToSet: { [path]: { name: action } }
    }
    this.patch(this.bagGoals.id, data, params)
  }
  private patch(id, data, params) {
    this.service.patch(id, data, params).catch(error => {
      console.log(error)
    })
  }

  private onPatched(item: any) {
    if (this.bagGoals.id === item._id) {
      this.bagGoals = this.transform(item)
      this.bagGoals$.next(this.bagGoals)
      this.bagGoalsComplete$.next(this.transformComplete(item))
    }
  }
}

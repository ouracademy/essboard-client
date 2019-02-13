import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { StateTemplate } from '../components/detail-alpha/kernel'
import { AlphaTemplate } from '../components/detail-alpha/kernel'
import { ChannelService } from './channel.service'
import { MembersService } from 'app/members/members.service'

@Injectable()
export class SessionSocketService extends SessionService {
  service: any
  statesService
  selectedSessionId$: BehaviorSubject<string>
  session: Session

  constructor(
    public socketService: SocketService,
    private channels: ChannelService,
    private membersService: MembersService,
    private router: Router
  ) {
    super()
    this.currentState$ = new BehaviorSubject<StateTemplate>(null)
    this.currentAlpha$ = new BehaviorSubject({ states: [] })
    this.currentChecklist$ = new BehaviorSubject([])

    this.service = this.socketService.getService('sessions')
    this.statesService = this.socketService.getService('states')

    this.selectedSessionId$ = new BehaviorSubject(null)
    this.currentSession$ = this.selectedSessionId$.pipe(
      switchMap(sessionId =>
        this.service
          .watch()
          .get(sessionId)
          .pipe(
            map(session => {
              console.log(session)
              // TODO: remove this.session can have problems..
              this.session = this.toSession(session)
              return this.session
            })
          )
      )
    )
  }

  getSessions(projectId: string) {
    return this.service
      .watch()
      .find({
        query: {
          projectId,
          $sort: {
            createdAt: -1
          }
        }
      })
      .pipe(
        map(result => {
          return result['data'].map(item => this.toSession(item))
        })
      )
  }

  set selectedSession(sessionId: string) {
    this.selectedSessionId$.next(sessionId)
    this.channels.join('sessions', sessionId)
  }

  get currentMembers$() {
    return this.membersService.until(
      this.session.projectId,
      this.session.endDate
    )
  }

  leaveChannel(): Observable<any> {
    return this.channels.leave('sessions')
  }

  get channelSubscriptions$() {
    return this.currentSession$.pipe(
      switchMap(session => this.channels.find('sessions', session.id))
    )
  }

  toSession(item) {
    return new Session(
      item['_id'],
      this.toLocalDate(item['createdAt']),
      this.toLocalDate(item['endDate']),
      item['projectId'],
      item['timeEvaluating']
    )
  }

  toLocalDate = utcDate => (utcDate ? new Date(utcDate) : null)

  addSession(projectId) {
    return this.service.create({
      projectId
    })
  }

  finish() {
    this.service.patch(this.session.id, { finish: true })
  }

  set selectedAlpha(alphaTemplate: AlphaTemplate) {
    this.getAlpha(alphaTemplate.id).then(states => {
      this.currentAlpha$.next({ id: alphaTemplate.id, states })
    })
  }

  private getAlpha(alphaId: string): Promise<any> {
    return this.socketService.getService('states').find({
      query: {
        date: this.sessionDate(),
        project: this.session.projectId,
        alpha: alphaId
      }
    })
  }

  set selectedState(state: StateTemplate) {
    this.currentState$.next(state)
    if (state) {
      this.getChecklist().then(checklist => {
        this.currentChecklist$.next(checklist)
      })
    } else {
      this.currentChecklist$.next([])
    }
  }

  private getChecklist() {
    const state = this.currentState$.getValue()
    return this.statesService.find({
      query: {
        date: this.sessionDate(),
        project: this.session.projectId,
        state: state.id,
        asCheckpoints: true
      }
    })
  }

  private sessionDate() {
    return this.session.endDate ? this.session.endDate : new Date()
  }

  delete(id) {
    this.service
      .remove(id)
      .then(result => {
        this.router.navigate(['user/projects'])
      })
      .catch(function(error) {
        alert('Error al eliminar  tu proyecto')
      })
  }

  startEvaluation() {
    this.socketService
      .getService('evaluations')
      .create({ sessionId: this.session.id })
  }
  stopEvaluation() {
    this.socketService.getService('evaluations').remove(this.session.id)
  }
}

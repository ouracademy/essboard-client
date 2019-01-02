import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, BehaviorSubject, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { KernelService } from '@core/kernel-knowledge.service'
import {
  StateTemplate,
  CheckpointTemplate
} from '../components/detail-alpha/kernel'
import { AlphaTemplate } from '../components/detail-alpha/kernel'
import { ProjectService } from 'app/projects/services/project.service'
import { ChannelService } from './channel.service'
import { MembersService } from 'app/members/members.service'

@Injectable()
export class SessionSocketService extends SessionService {
  service: any
  statesService
  votesService
  selectedSessionId$: BehaviorSubject<string>
  session: Session

  constructor(
    public socketService: SocketService,
    public projectService: ProjectService,
    public kernelKnowledgeService: KernelService,
    private channels: ChannelService,
    private membersService: MembersService,
    private router: Router
  ) {
    super()
    this.service = this.socketService.getService('sessions')
    this.statesService = this.socketService.getService('states')
    this.votesService = this.socketService.getService('votes')

    this.votesService.on('created', ({ checkpoint }) => {
      const currentAlpha = this.currentAlpha$.getValue()
      const currentState = this.currentState$.getValue()

      if (this.canGetAlpha(currentAlpha, checkpoint)) {
        this.selectedAlpha = currentAlpha
      }
      if (this.canGetState(currentState, checkpoint)) {
        this.selectedState = currentState
      }
    })

    this.currentState$ = new BehaviorSubject<StateTemplate>(null)
    this.currentAlpha$ = new BehaviorSubject({ states: [] })
    this.currentChecklist$ = new BehaviorSubject([])

    this.selectedSessionId$ = new BehaviorSubject(null)
    this.currentSession$ = this.selectedSessionId$.pipe(
      switchMap(sessionId =>
        this.service
          .watch()
          .get(sessionId)
          .pipe(
            map(session => {
              // TODO: remove this.session can have problems..
              this.session = this.toSession(session)
              return this.session
            })
          )
      )
    )
  }

  private canGetAlpha(currentAlpha: AlphaTemplate, checkpoint: string) {
    return parseInt(currentAlpha.id, 10) === this.getAlphaFrom(checkpoint)
  }

  private canGetState(currentState: StateTemplate, checkpoint: string) {
    return (
      currentState &&
      parseInt(currentState.id, 10) === this.getStateFrom(checkpoint)
    )
  }

  getAlphaFrom(checkpoint) {
    return Math.floor(this.getStateFrom(checkpoint) / 10)
  }

  getStateFrom(checkpoint: string): number {
    return parseInt(checkpoint.split('-')[0], 10)
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
      item['projectId']
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
    return this.socketService.getService('states').find({
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

  voteCheckpoint(checkpointTemplate: CheckpointTemplate, vote: boolean) {
    this.socketService.getService('votes').create({
      type: vote ? 'VOTE_EMITED' : 'VOTE_REMOVED',
      checkpoint: checkpointTemplate.id,
      session: this.session.id,
      project: this.session.projectId
    })
  }
}

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

      if (this.canGetAlpha(currentAlpha.id, checkpoint)) {
        this.selectedAlpha = currentAlpha
      }
      if (this.canGetChecklist(currentState.id, checkpoint)) {
        this.selectedState = currentState
      }
    })

    this.currentState$ = new BehaviorSubject<StateTemplate>(null)
    this.currentAlpha$ = new BehaviorSubject({ states: [] })
    this.currentChecklist$ = new BehaviorSubject([])
    this.currentSession$ = new BehaviorSubject<Session>(null)
    this.currentMembers$ = of([])
  }

  private canGetAlpha(currentAlphaId: string, checkpoint: any) {
    return parseInt(currentAlphaId, 10) === Math.floor(checkpoint / 100)
  }
  private canGetChecklist(currentStateId: string, checkpoint: any) {
    return parseInt(currentStateId, 10) === Math.floor(checkpoint / 10)
  }

  getSessions(projectId: string) {
    return this.service
      .watch()
      .find({ query: { projectId } })
      .pipe(
        map(result => {
          return result['data'].map(item => this.toSession(item))
        })
      )
  }

  set selectedSession(sessionId: string) {
    this.service.get(sessionId).then(session => {
      this.currentMembers$ = this.membersService.until(
        session.projectId,
        session.endDate ? session.endDate : session.createdAt
      )

      this.channels.join('sessions', session['_id'])
      this.session = this.toSession(session)
      this.currentSession$.next(this.session)
    })
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
      item['createdAt'],
      item['endDate'],
      item['projectId']
    )
  }

  addSession(projectId) {
    return this.service.create({
      projectId
    })
  }

  finish(session) {
    this.service.patch(session.id, { finish: true })
  }

  set selectedAlpha(alphaTemplate: AlphaTemplate) {
    this.getAlpha(alphaTemplate.id).then(states => {
      this.currentAlpha$.next({ id: alphaTemplate.id, states })
    })
  }

  private getAlpha(alphaId: string): Promise<any> {
    const date = this.session.endDate ? this.session.endDate : new Date()
    return this.socketService.getService('states').find({
      query: {
        date,
        project: this.session.projectId,
        alpha: alphaId
      }
    })
  }

  set selectedState(state: StateTemplate) {
    this.currentState$.next(state)
    this.getChecklist().then(checklist => {
      this.currentChecklist$.next(checklist)
    })
  }

  private getChecklist() {
    const date = this.session.endDate
      ? this.session.endDate
      : new Date(2018, 10, 30) // TODO: check this
    const state = this.currentState$.getValue()
    return this.socketService.getService('states').find({
      query: {
        date,
        project: this.session.projectId,
        state: state.id,
        asCheckpoints: true
      }
    })
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

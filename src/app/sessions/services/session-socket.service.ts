import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, from, BehaviorSubject, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { GetKeys } from '@no-module/util/get-keys-from-object'
import { AuthService } from '@core/auth.service'
import { KernelService } from '@core/kernel-knowledge.service'
import {
  StateTemplate,
  CheckpointTemplate
} from '../components/detail-alpha/kernel'
import { AlphaTemplate } from '../components/detail-alpha/kernel'
import { ProjectService } from 'app/projects/services/project.service'
import { ChannelService } from './channel.service'

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
    private auth: AuthService,
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
        this.setSelectedAlpha(currentAlpha)
      }
      if (this.canGetChecklist(currentState.id, checkpoint)) {
        this.setSelectedState(currentState)
      }
    })

    this.currentState$ = new BehaviorSubject<StateTemplate>(null)
    this.currentAlpha$ = new BehaviorSubject({ states: [] })
    this.currentChecklist$ = new BehaviorSubject([])
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

  getSession(id: string): Observable<Session> {
    return this.service
      .watch()
      .get(id)
      .pipe(
        map(item => {
          this.projectService.getMembers(item['projectId'])
          this.channels.join('sessions', item['_id'])
          this.getSessionChannelSubscriptions(id)
          this.session = this.toSession(item)
          return this.session
        })
      )
  }

  leaveChannel(): Observable<any> {
    return this.channels.leave('sessions')
  }

  getSessionChannelSubscriptions(sessionId) {
    return this.channels.find('sessions', sessionId)
  }

  get channelSubscriptions$() {
    return this.getSessionChannelSubscriptions(this.session.id)
  }

  get selectedSession() {
    return this.session
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

  setSelectedAlpha(alphaTemplate: AlphaTemplate) {
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

  set state(state: StateTemplate) {
    this.currentState$.next(state)
  }

  setSelectedState(state: StateTemplate) {
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

  // mthods q aun no vemos al final

  private addGoalsContainerBySession(sessionId: string) {
    // old way but now this will change
    let data = { sessionId: sessionId }
    let goalService = this.socketService.getService('goals')
    goalService.create(data)
  }

  colaboreUsingUserIdInProject(idSession: string, idProject: string) {
    let userId = this.auth.user.id
    let data = { participants: userId }
    let action = { $addToSet: data }
    this.patch(idSession, action, {})
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

  setStateAsWorking(id, dimensionMetadataId, stateMetadataId) {
    let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId)
    let base = 'alphas.' + indexs.dimension + '.states.' + indexs.state
    let path = base + '.isWorking'
    let params = {}
    let data = { [path]: true }
    let action = { $set: data }
    this.patch(id, action, params)
  }

  voteCheckpoint(checkpointTemplate: CheckpointTemplate, vote: boolean) {
    this.socketService.getService('votes').create({
      type: vote ? 'VOTE_EMITED' : 'VOTE_REMOVED',
      checkpoint: checkpointTemplate.id,
      session: this.session.id,
      project: this.session.projectId
    })
  }

  private patch(id, data, params) {
    this.service
      .patch(id, data, params)
      .then(result => {})
      .catch(function(error) {})
  }

  public colaboreUsingSessionsIdInUser(idSession) {
    this.socketService
      .getService('users')
      .patch(this.auth.user.id, { $addToSet: { sessionsId: idSession } })
      .then(result => {})
      .catch(function(error) {})
  }
}

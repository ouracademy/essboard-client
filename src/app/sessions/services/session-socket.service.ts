import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, Subject, from, of } from 'rxjs'

import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { GetKeys } from '@no-module/util/get-keys-from-object'
import { AuthService } from '@core/auth.service'
import { KernelService } from '@core/kernel-knowledge.service'
import {
  AlphaTemplate,
  Alpha,
  StateTemplate,
  State
} from '../components/setCurrentState/index.component'
import { ProjectService } from 'app/projects/services/project.service'

@Injectable()
export class SessionSocketService extends SessionService {
  service: any
  channelSubscriptionsService

  session: Session
  sessions = []
  channelSubscriptions: any[] = []
  currentSubscription

  constructor(
    public socketService: SocketService,
    public projectService: ProjectService,
    public kernelKnowledgeService: KernelService,
    private auth: AuthService,
    private router: Router
  ) {
    super()
    this.service = this.socketService.getService('sessions')
    this.channelSubscriptionsService = this.socketService.getService(
      'channel-subscriptions'
    )

    this.service.on('patched', session => this.onPatched(session))
    this.service.on('created', session => this.onCreated(session))

    this.channelSubscriptionsService.on('created', subscription =>
      this.handleChangeSubscriptions('add', subscription)
    )
    this.channelSubscriptionsService.on('removed', subscription =>
      this.handleChangeSubscriptions('remove', subscription)
    )

    this.currentSession$ = new Subject<any>()
    this.sessions$ = new Subject()
    this.channelSubscriptions$ = new Subject<any>()
  }

  getSession(id: string) {
    this.service.get(id).then((item: any) => {
      this.session = this.toSession(item)
      this.currentSession$.next(this.session)
      this.joinToSessionChannel()
      this.getSessionChannelSubscriptions(id)
      this.projectService.getMembers(item['projectId'])
    })
  }

  private joinToSessionChannel() {
    this.channelSubscriptionsService
      .create({
        idType: this.session.id,
        type: 'sessions'
      })
      .then(subscription => {
        this.currentSubscription = subscription
      })
      .catch(error => {
        this.currentSubscription = error['data']
      })
  }

  leaveSessionChannel(session: Session): Observable<any> {
    const { _id } = this.currentSubscription
    return from(
      this.channelSubscriptionsService
        .remove(_id, {
          type: 'sessions',
          idType: session.id
        })
        .then(data => {
          this.handleChangeSubscriptions('remove', data)

          return true
        })
    )
  }

  getSessionChannelSubscriptions(sessionId) {
    this.channelSubscriptionsService
      .find({
        idType: sessionId,
        type: 'sessions'
      })
      .then(result => {
        this.channelSubscriptions = result['data']
        this.channelSubscriptions$.next(this.channelSubscriptions)
      })
  }

  toSession(item) {
    return new Session(
      item['_id'],
      item['createdAt'],
      item['endDate'],
      item['projectId']
    )
  }

  getSessions(projectId: string) {
    this.service.find({ query: { projectId } }).then((result: any) => {
      this.sessions = result['data']
      this.sessions$.next(this.sessions)
    })
  }

  addSession(projectId) {
    return this.kernelKnowledgeService
      .getSchemaKernel()
      .toPromise()
      .then(alphas =>
        this.service.create({
          projectId,
          kernel: { alphas }
        })
      )
  }

  finish(session) {
    this.service.patch(session.id, { finish: true })
  }

  getAlpha(alpha: AlphaTemplate): Observable<Alpha> {
    const sessionId = this.session.id
    return from(
      this.socketService
        .getService('alphas')
        .find({ query: { knowledgeId: alpha.id, sessionId: sessionId } })
    )
  }

  setStateToAlpha(
    alpha: Alpha,
    stateTemplate: StateTemplate,
    state: State,
    checked: any
  ) {
    if (state) {
      return this.socketService
        .getService('states')
        .patch(state._id, { vote: checked })
    } else {
      return this.socketService.getService('states').create({
        knowledgeId: stateTemplate.id,
        alphaId: alpha._id,
        status: 'done'
      })
    }
  }

  private onPatched(session: any) {
    this.currentSession$.next(this.toSession(session))
  }
  private onCreated(session: any) {
    this.sessions$.next([this.toSession(session), ...this.sessions])
  }

  private handleChangeSubscriptions(action, data) {
    if (action === 'add') {
      this.channelSubscriptions = [...this.channelSubscriptions, data]
    }
    if (action === 'remove') {
      this.channelSubscriptions = this.channelSubscriptions.filter(
        subscription => data['_id'] !== subscription._id
      )
    }
    this.channelSubscriptions$.next(this.channelSubscriptions)
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
  setVoteToCheckpoint(
    id,
    dimensionMetadataId,
    stateMetadataId,
    checkpointMetadataId,
    condition
  ) {
    let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId)
    let username = this.auth.user.name
    let base =
      'alphas.' + indexs.dimension + '.states.' + indexs.state + '.checklist'
    let path = base + '.$.favorablesVotes'
    let search = base + '.metadataId'
    let params = { ['query']: { [search]: checkpointMetadataId } }
    let data = { [path]: username }
    let action = { $addToSet: data }
    this.patch(id, action, params)
  }
  setUnVoteToCheckpoint(
    id,
    dimensionMetadataId,
    stateMetadataId,
    checkpointMetadataId,
    condition
  ) {
    let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId)
    let username = this.auth.user.name
    let base =
      'alphas.' + indexs.dimension + '.states.' + indexs.state + '.checklist'
    let path = base + '.$.favorablesVotes'
    let search = base + '.metadataId'
    let params = { ['query']: { [search]: checkpointMetadataId } }
    let data = { [path]: username }
    let action = { $pull: data }
    this.patch(id, action, params)
  }

  private patch(id, data, params) {
    this.service
      .patch(id, data, params)
      .then(result => {})
      .catch(function(error) {})
  }

  setCheckpointTo(
    id,
    dimensionMetadataId,
    stateMetadataId,
    checkpointMetadataId,
    condition
  ) {
    let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId)
    let base =
      'alphas.' + indexs.dimension + '.states.' + indexs.state + '.checklist'
    let path = base + '.$.isAchieved'
    let search = base + '.metadataId'
    let params = { ['query']: { [search]: checkpointMetadataId } }
    let data = { [path]: condition }
    let action = { $set: data }
    this.patch(id, action, params)
  }

  public colaboreUsingSessionsIdInUser(idSession) {
    this.socketService
      .getService('users')
      .patch(this.auth.user.id, { $addToSet: { sessionsId: idSession } })
      .then(result => {})
      .catch(function(error) {
        console.log(error)
      })
  }
}

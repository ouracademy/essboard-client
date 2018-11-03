import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, Subject, from } from 'rxjs'
import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { GetKeys } from '@no-module/util/get-keys-from-object'
import { AuthService } from '@core/auth.service'
import { KernelService } from '@core/kernel-knowledge.service'

@Injectable()
export class SessionSocketService extends SessionService {
  session: Session
  sessions = []
  sessions$: Subject<any>
  service: any
  channelSubscriptions: any

  constructor(
    public socketService: SocketService,
    public kernelKnowledgeService: KernelService,
    private auth: AuthService,
    private router: Router
  ) {
    super()
    this.service = this.socketService.getService('sessions')
    this.channelSubscriptions = this.socketService.getService(
      'channel-subscriptions'
    )

    this.service.on('patched', session => this.onPatched(session))
    this.service.on('created', session => this.onCreated(session))
    this.currentSession$ = new Subject<any>()
    this.sessions$ = new Subject()
  }

  getSession(id: string) {
    this.service.get(id).then((item: any) => {
      this.session = this.toSession(item)
      GetKeys.setSource(item.alphas)
      this.currentSession$.next(this.session)

      this.channelSubscriptions.create({
        id: this.session.id,
        type: 'sessions'
      })
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

  leave(session: Session): boolean | Observable<boolean> {
    return from(
      this.channelSubscriptions.remove(session.id, { type: 'sessions' })
    )
  }

  private onPatched(session: any) {
    this.currentSession$.next(this.toSession(session))
  }
  private onCreated(session: any) {
    this.sessions$.next([this.toSession(session), ...this.sessions])
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
      .then(result => {
        console.log('edited', result)
      })
      .catch(function(error) {
        console.log(error)
      })
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

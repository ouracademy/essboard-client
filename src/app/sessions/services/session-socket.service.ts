import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, Subject } from 'rxjs'
import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { ToSession } from '@no-module/transforms/to-session'
import { GetKeys } from '@no-module/util/get-keys-from-object'
import { AuthService } from '@core/auth.service'
import { KernelService } from '@core/kernel-knowledge.service'

@Injectable()
export class SessionSocketService extends SessionService {
  items: Observable<any>
  sessionObserver: any
  session: Session
  sessions: Session[]
  service: any
  constructor(
    public socketService: SocketService,
    public kernelKnowledgeService: KernelService,
    private auth: AuthService,
    private router: Router
  ) {
    super()
    this.service = this.socketService.getService('sessions')
    this.service.on('patched', patchedItem => this.onPatched(patchedItem))
    this.currentSession$ = new Subject<any>()
    this.session = null
  }

  getSession(id: string) {
    this.service.get(id).then((item: any) => {
      console.log('session', item)
      this.session = new Session(item['_id'], item['nroOrder'], new Date())
      GetKeys.setSource(item.alphas)
      this.currentSession$.next(this.session)
    })
  }

  addSession(projectId, lastSessionId) {
    this.kernelKnowledgeService.getSchemaKernel().subscribe(result => {
      this.service
        .create({
          projectId: projectId,
          kernel: { alphas: result },
          lastSessionId
        })
        .then(session => {
          //this.addGoalsContainerBySession(session._id)
        })
    })
  }

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

  private onPatched(patchedItem: any) {
    if (patchedItem._id === this.session.id) {
      this.session = ToSession.withCompleteTransformation(patchedItem)
      GetKeys.setSource(patchedItem.alphas)
      this.currentSession$.next(this.session)
    }
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

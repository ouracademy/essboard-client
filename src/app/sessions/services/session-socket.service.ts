import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { Observable, from, BehaviorSubject } from 'rxjs'
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
    this.statesService.on('patched', result => {
      this.currentState$.next({
        ...result,
        votes: this.projectService.getInfoMembers(result['votes'])
      })
    })

    this.currentState$ = new BehaviorSubject<StateTemplate>(null)
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

  getAlpha(alpha: AlphaTemplate): Observable<any> {
    // TODO: fix this (problem with client sending other date that the server doesn't know)
    const date = this.session.endDate ? this.session.endDate : new Date()

    return from(
      this.socketService
        .getService('states')
        .find({
          query: { date, project: this.session.projectId, alpha: alpha.id }
        })
        .then(result => {
          this.channels.join('alphas', `${this.session.id}-${alpha.id}`)
          return result
        })
    )
  }

  // can vote
  set state(state: StateTemplate) {
    // esto es llamar a states muchas veces, cada vez q votes avisar q ststes ha cambiado
    this.currentState$.next(state)

    // if (previousState) {
    //   this.leaveChannel('states', previousState._id)
    // }
    // const stateId = state && state._id
    // if (stateId) {
    //   this.statesService.get(stateId).then(result => {
    //     this.currentState$.next({
    //       ...result,
    //       votes: this.projectService.getInfoMembers(result['votes'])
    //     })
    //     this.joinToChannel('states', stateId)
    //   })
    // } else {
    //   this.currentState$.next(null)
    // }
  }

  get checklist() {
    const date = this.session.endDate
      ? this.session.endDate
      : new Date(2018, 10, 30) // TODO: check this
    const state = this.currentState$.getValue()

    return from(
      this.socketService.getService('states').find({
        query: {
          date,
          project: this.session.projectId,
          state: state.id,
          asCheckpoints: true
        }
      })
    )
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

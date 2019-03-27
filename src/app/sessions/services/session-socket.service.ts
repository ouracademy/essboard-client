import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Session } from '@models/project'
import { Observable, BehaviorSubject, Subject, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { SessionService } from './session.service'
import { SocketService } from '@core/socket.service'
import { StateTemplate } from '../components/detail-alpha/kernel'
import { AlphaTemplate } from '../components/detail-alpha/kernel'
import { ChannelService } from './channel.service'
import { MembersService } from 'app/members/members.service'
import { AuthService } from '@core/auth.service'

@Injectable()
export class SessionSocketService extends SessionService {
  service: any
  selectedSessionId$: BehaviorSubject<string>
  session: Session
  statusChat: Subject<any>

  constructor(
    public socketService: SocketService,
    private channels: ChannelService,
    private membersService: MembersService,
    private router: Router,
    private authService: AuthService
  ) {
    super()
    this.currentState$ = new BehaviorSubject<StateTemplate>(null)
    this.currentAlpha$ = new BehaviorSubject({ states: [] })
    this.currentChecklist$ = new BehaviorSubject([])

    this.service = this.socketService.getService('sessions')
    this.statusChat$ = new Subject<any>()

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

    this.socketService.getService('comments').on('created', data => {
      console.log(data)
    })
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
    return this.authService.isLoggedIn
      ? this.channels.leave('sessions')
      : of(true)
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
    return this.socketService.getService('session-status').find({
      query: {
        sessionId: this.session.id,
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
    return this.socketService.getService('session-status').find({
      query: {
        sessionId: this.session.id,
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
  saveComment({ text, checkpoint }) {
    console.log({ checkpoint, project: this.session.projectId })
    this.socketService.getService('comments').create({
      text,
      checkpoint,
      project: this.session.projectId
    })
  }
  getComments(checkpoint): Observable<any> {
    return this.socketService
      .getService('comments')
      .watch()
      .find({
        query: {
          project: this.session.projectId,
          checkpoint,
          $sort: {
            createdAt: -1
          }
        }
      })
  }
  updateComment(commentId, text) {
    this.socketService.getService('comments').patch(commentId, {
      text: text
    })
  }
  deleteComment(comment) {
    this.socketService.getService('comments').remove(comment._id)
  }
}

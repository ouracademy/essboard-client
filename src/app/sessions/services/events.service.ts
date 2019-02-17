import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { Session } from '@shared/no-module/models/project'
import { map, flatMap } from 'rxjs/operators'
import { from } from 'rxjs'

export interface DomainEvent {
  aggregatedId: string
  type: string
  data: any
  createdAt: string
}

const unique = array => [...new Set(array)]

@Injectable()
export class EventsService {
  constructor(public socketService: SocketService) {}

  of(session: Session) {
    return this.socketService
      .getService<DomainEvent>('events')
      .watch()
      .find({
        query: {
          aggregatedId: session.projectId,
          $limit: 10,
          $sort: {
            createdAt: -1
          }
        }
      })
      .pipe(
        map((events: DomainEvent[]) =>
          events.map(event => ({
            ...format(event.type, event.data),
            createdAt: event.createdAt
          }))
        ),
        flatMap(this.withUser)
      )
  }

  withUser = events =>
    from(
      this.getUsers(unique(events.map(x => x.userId))).then(result =>
        events.map(event => ({
          ...event,
          user: result['data'].find(user => user._id === event.userId)
        }))
      )
    )

  getUsers = userIds =>
    this.socketService.getService('users').find({
      query: {
        _id: {
          $in: userIds
        }
      }
    })
}

const format = (type, event) => {
  switch (type) {
    case 'MEMBER_INVITED':
      return {
        userId: event.userId,
        text:
          event.role === 'owner'
            ? 'creo el proyecto'
            : `fue invitado para ser ${event.role}`
      }
    case 'MEMBER_REMOVED':
      return {
        userId: event.userId,
        text: `dejo de ser miembro del equipo`
      }
    case 'OPINION_EMITED':
      return {
        userId: event.from,
        text:
          event.is === 'nothing'
            ? `prefirio no emitir una opinion sobre el check ${event.for}`
            : `opinó que el check ${event.for} ${
                event.is === 'goal' ? 'es una meta' : 'ha sido logrado'
              }`
      }
    case 'EVALUATION_STARTED':
      return {
        userId: event.from,
        text: `inicio la evaluación que durara ${event.duration}ms`
      }
    case 'EVALUATION_FINISHED':
      return {
        userId: event.from,
        text: `acabo la evaluación`
      }
  }
  throw new Error(`Event doesn't have a format`)
}

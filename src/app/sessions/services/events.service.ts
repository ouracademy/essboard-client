import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { Session } from '@shared/no-module/models/project'
import { flatMap } from 'rxjs/operators'
import { from } from 'rxjs'

export interface DomainEvent {
  aggregatedId: string
  type: string
  data: any
  createdAt: string
}

interface UserResponse {
  _id: string
  name: string
  email: string
  createdAt: Date
}

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
        flatMap(events => {
          return from(this.format(events as DomainEvent[]))
        })
      )
  }

  async format(events: DomainEvent[]) {
    return await Promise.all(
      events.map(async event => ({
        user: await this.getUser(event.data.from),
        text: await this.getText(event),
        createdAt: event.createdAt
      }))
    )
  }

  async getText(event) {
    const { data } = event
    switch (event.type) {
      case 'PROJECT_CREATED':
        return 'creo el proyecto'
      case 'MEMBER_INVITED':
        const user = await this.getUser(data.to)
        return `invitó a ${user.name} a ser ${data.role}`
      case 'MEMBER_REMOVED':
        return `dejo de ser miembro del equipo`
      case 'OPINION_EMITED':
        return data.is === 'nothing'
          ? `prefirio no emitir una opinion sobre el check ${data.for}`
          : `opinó que el check ${data.for} ${
              data.is === 'goal' ? 'es una meta' : 'ha sido logrado'
            }`
      case 'EVALUATION_STARTED':
        return `inicio la evaluación que durara ${data.duration}ms`
      case 'EVALUATION_FINISHED':
        return ` acabo la evaluación`
    }

    throw new Error(`Event doesn't have a format`)
  }

  getUser(userId): Promise<{ name: string }> {
    return this.socketService
      .getService<UserResponse>('users')
      .get(userId)
      .then(x => ({ name: x.name }))
  }
}

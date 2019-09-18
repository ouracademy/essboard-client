import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { Session } from '@models/project'
import { from } from 'rxjs'
import { flatMap } from 'rxjs/operators'

export interface DomainEvent {
  aggregatedId: string
  type: string
  data: any
  from: string
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
        user: await this.getUser(event.from),
        text: await this.getText(event),
        createdAt: new Date(event.createdAt).getTime()
      }))
    )
  }

  async getText(event: DomainEvent) {
    const { data } = event
    switch (event.type) {
      case 'PROJECT_CREATED':
        return 'created the project'
      case 'MEMBER_INVITED':
        return `invited to ${data.to} to be a ${data.role}`
      case 'MEMBER_JOINED':
        return `joined as  ${data.role}`
      case 'MEMBER_REMOVED':
        return await this.formatEventRemoved(data)
      case 'OPINION_EMITED':
        return data.is === 'nothing'
          ? `prefer not emit a opinion about ${data.for} check`
          : `emitted an opinion that the check ${data.for} ${
              data.is === 'goal' ? 'is a goal' : 'is achieved'
            }`
      case 'EVALUATION_STARTED':
        return `started the evaluation (with a duration of ${formatTime(
          data.duration
        )})`
      case 'EVALUATION_FINISHED':
        return `stopped the evaluation`
      case 'COMMENT_ADDED':
        return `added a comment to the ${data.for} checkpoint`
    }

    throw new Error(`Event doesn't have a format ${JSON.stringify(event)}`)
  }

  private async formatEventRemoved(data: any) {
    const user = await this.getUser(data.to)
    return `has removed ${user.name} from the project`
  }

  getUser(userId): Promise<{ name: string }> {
    return this.socketService
      .getService<UserResponse>('users')
      .get(userId)
      .then(x => ({ name: x.name }))
  }
}

const formatTime = ms => {
  const seconds = ms / 1000
  return seconds < 60 ? `${seconds} s` : `${seconds / 60} min`
}

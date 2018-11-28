import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { from, Observable } from 'rxjs'

@Injectable()
export class ChannelService {
  subscriptions = {}
  service: any

  constructor(socketService: SocketService) {
    this.service = socketService.getService('channel-subscriptions')
  }

  public join(aChannelName, aIdentifier) {
    return this.service
      .create({
        identifier: aIdentifier,
        name: aChannelName
      })
      .then(subscription => {
        this.subscriptions[aChannelName] = subscription
      })
      .catch(error => {
        this.subscriptions[aChannelName] = error['data']
      })
  }

  public leave(aChannelName): Observable<any> {
    const { _id } = this.subscriptions[aChannelName]
    return from(
      this.service
        .remove(_id)
        .then(() => {
          delete this.subscriptions[aChannelName]
          return true
        })
        .catch(() => false)
    )
  }

  find(aChannelName, aIdentifier) {
    return this.service.watch().find({
      query: {
        identifier: aIdentifier,
        name: aChannelName
      }
    })
  }
}

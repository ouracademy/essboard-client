import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { from, Observable } from 'rxjs'

@Injectable()
export class ChannelService {
  subscriptions = new Map()
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
        this.subscriptions.set(aChannelName, subscription)
      })
      .catch(error => {
        // if error is already connected
        this.subscriptions.set(aChannelName, error['data'])
      })
  }

  public leave(aChannelName): Observable<any> {
    const { _id } = this.subscriptions.get(aChannelName)
    return from(
      this.service
        .remove(_id)
        .then(() => {
          this.subscriptions.delete(aChannelName)
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

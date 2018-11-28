import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { Observable } from 'rxjs/Observable'
import { Service } from '@feathersjs/feathers'

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

  public leave(aChannelName, aIdentifier) {
    const { _id } = this.subscriptions[aChannelName]
    return this.service
      .remove(_id, {
        name: aChannelName,
        identifier: aIdentifier
      })
      .then(() => delete this.subscriptions[aChannelName])
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

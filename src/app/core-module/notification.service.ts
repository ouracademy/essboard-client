import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'

import { map } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Injectable()
export class NotificationService {
  public newNotification$ = new Subject()
  notificationService

  constructor(public socketService: SocketService) {
    this.notificationService = this.socketService.getService('notifications')
    this.notificationService.on('created', newItem =>
      this.newNotification$.next(newItem)
    )
  }

  get notifications$() {
    return this.notificationService
      .watch()
      .find({
        query: {
          $limit: 15,
          $sort: {
            createdAt: -1
          }
        }
      })
      .pipe(map(x => x['data']))
  }

  markAsRead(idNotification) {
    this.notificationService.patch(idNotification, { readed: true })
  }
}

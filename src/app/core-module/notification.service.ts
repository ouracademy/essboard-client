import { Injectable } from '@angular/core';
import { SocketService } from '@core/socket.service';

import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {

    public notifications$ = new BehaviorSubject([])
    public newNotification$ = new Subject()
    notificationService


    constructor(public socketService: SocketService) {

        this.notificationService = this.socketService.getService('notifications')
        this.notificationService.on('created', (newItem) => this.newNotification$.next(newItem));

    }
    startSubscription() {
        this.notificationService.watch().find({
            query: {
                $limit: 15,
                $sort: {
                    createdAt: -1
                }
            }
        }).subscribe(r => { this.notifications$.next(r['data']) })
    }
    markAsRead(idNotification) {
        this.notificationService.patch(idNotification, { readed: true }).then(result => { console.log(result) })

    }



}

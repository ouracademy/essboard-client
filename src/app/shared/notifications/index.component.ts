import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { SharedService } from '@core/shared.service';
import { Router } from '@angular/router';
import { path } from 'ramda';
import { NotificationService } from '@core/notification.service';

interface Notification {
    _id: any,
    to: any,
    message: String,
    subject: any,
    data: { resource: String, id: String },
    readed: Boolean
}


@Component({
    selector: 'app-notifications',
    template: `
    <div >
  
    <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon [matBadge]="notifications.length" matBadgeColor="warn">home</mat-icon>
    </button>
        <mat-menu #menu="matMenu">
            <button mat-menu-item *ngFor="let not of notifications"  class="not" [ngClass]="{ 'focus-not': !not.readed }"  (click)="handleClick(not)">
                <span>{{not.message}}</span>
            </button>
        </mat-menu>
    </div>
    `,
    styles: [
        `.not{
            border-bottom: 0.5px solid #c3bcbc;
            border-radius: 0 !important;
            opacity: 0.5;
            background: #e6e0e0;
        }
        .focus-not{
            background: white;
            opacity: 1;         
        }
        `

    ]


})


export class NotificationsComponent implements OnInit {
    notifications: Notification[] = []

    subjectNotification: { invitation: {} } = {
        'invitation': { message: 'Invitación', route: 'me/projects/' }
    }

    routers = {
        'project': 'me/projects/',
    }
    constructor(public notificationService: NotificationService, private router: Router, private share: SharedService) {

    }

    ngOnInit() {
        this.notificationService.newNotification$.subscribe((notification: Notification) => {
            this.share.showSucces(this.subjectNotification[notification.subject].message, notification.message)
        })
        this.notificationService.notifications$.subscribe(re => { this.notifications = re })
    }

    handleClick(notification: Notification) {
        if (this.isToRoute(notification.subject)) {
            this.router.navigate([this.getUrl(notification)])
        }
        if (!notification.readed) {
            this.notificationService.markAsRead(notification._id)
        }

    }
    private getUrl(notification: Notification) {
        return `${this.getSubjectData(notification.subject).route}${notification.data.id}`
    }
    private getSubjectData(subject) {
        return this.subjectNotification[subject]
    }
    private isToRoute(subject) {
        return !!path([subject, 'route'], this.subjectNotification)
    }

}

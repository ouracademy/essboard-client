import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NotificationService } from '@core/notification.service'
import { path } from 'ramda'
import { Subscription } from 'rxjs'

interface Notification {
  _id: any
  to: any
  message: string
  subject: any
  data: { resource: string; id: string }
  readed: Boolean
}

@Component({
  selector: 'app-notifications',
  template: `
    <div>
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon
          [matBadgeHidden]="notReadedNotifications.length === 0"
          [matBadge]="notReadedNotifications.length"
          matBadgeColor="warn"
          >notifications</mat-icon
        >
      </button>
      <mat-menu #menu="matMenu">
        <div mat-menu-item *ngIf="notifications.length < 1">
          You don't have notifications yet
        </div>
        <button
          mat-menu-item
          *ngFor="let not of notifications"
          class="not"
          [ngClass]="{ 'focus-not': !not.readed }"
          (click)="handleClick(not)"
        >
          {{ not.message }}
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      .not {
        border-radius: 0 !important;
        border-bottom: 0.5px solid #c3bcbc;
        opacity: 0.5;
        background: #e6e0e0;
      }
      .focus-not {
        background: white;
        opacity: 1;
      }

      button.mat-menu-item {
        height: 50px;
        white-space: normal;
        text-overflow: clip;
        line-height: normal;
      }
    `
  ]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = []
  subscription: Subscription

  subjectNotification: { invitation: {} } = {
    invitation: { message: 'Invitación', route: 'me/invitations/' }
  }

  constructor(
    public notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.notificationService
      .notifications$()
      .subscribe(re => {
        this.notifications = re
      })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
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
    return `${this.getSubjectData(notification.subject).route}${
      notification.data.id
    }`
  }
  private getSubjectData(subject) {
    return this.subjectNotification[subject]
  }
  private isToRoute(subject) {
    return !!path([subject, 'route'], this.subjectNotification)
  }

  get notReadedNotifications(): Notification[] {
    return this.notifications.filter(x => !x.readed)
  }
}

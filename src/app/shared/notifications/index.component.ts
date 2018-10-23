import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { SharedService } from '@core/shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notifications',
    template: `
    <div >
  
    <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon [matBadge]="notifications.length" matBadgeColor="warn">home</mat-icon>
    </button>
        <mat-menu #menu="matMenu">
            <button mat-menu-item *ngFor="let not of notifications" (click)="handleClick(not)">
                <span>{{not.message}}</span>
            </button>
        </mat-menu>
    </div>
    `


})

export class NotificationsComponent implements OnInit {
    @Input() mode
    notifications = []

    routers = {
        'project': 'me/projects/',
    }
    constructor( private auth: AuthService, private router :Router, private share: SharedService) { }

    ngOnInit() {
        this.auth.newNotification$.subscribe( notification => {

            this.share.showSucces('Invitación', 'Has sido invitado a un nuevo proyecto')

        })
        this.auth.notifications$.subscribe( notifications => this.notifications = notifications)

    }
    handleClick( notification ){
       this.router.navigate([])
    }
}

import { Component, OnInit } from '@angular/core'
import { AuthService } from '@core/auth.service'
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material'
import { HeaderModule } from '@shared/header/index.module'

@Component({
  selector: 'app-inside-layout',
  template: `
    <app-header mode="toolbar">
      <right-content class="row">
        <mat-menu
          class="menu-options"
          x-position="after"
          y-position="below"
          #menu="matMenu"
        >
          <button mat-menu-item routerLink="/me/projects">Mis proyectos</button>
          <button mat-menu-item (click)="logout()">Salir</button>
        </mat-menu>
        <button mat-icon-button class="avatar" [matMenuTriggerFor]="menu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <app-notifications></app-notifications>
      </right-content>
    </app-header>
    <div class="pad-0-5"><router-outlet></router-outlet></div>
  `
})
export class InsideLayoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {}
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  get user() {
    return this.auth.user
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']))
  }
}

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { CommonAppModule } from '@shared/common'
import { Router } from '@angular/router'
import { NotificationsModule } from '@shared/notifications/index.module'
import { RouterModule } from '@angular/router'
@NgModule({
  imports: [
    CommonAppModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HeaderModule,
    NotificationsModule
  ],
  declarations: [InsideLayoutComponent],
  exports: [InsideLayoutComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InsideLayoutModule {}

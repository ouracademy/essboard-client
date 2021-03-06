import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@core/auth.service'

@Component({
  selector: 'app-account',
  template: `
    <app-our-avatar
      [matMenuTriggerFor]="menu"
      class="pad-0-3"
      size="30"
      [user]="user"
    ></app-our-avatar>
    <mat-menu
      class="menu-options"
      x-position="after"
      y-position="below"
      #menu="matMenu"
    >
      <button mat-menu-item routerLink="/me/projects">My projects</button>
      <button mat-menu-item (click)="logout()">Sign out</button>
    </mat-menu>
  `,
  styles: [
    `
      :host {
        padding: 5px;
      }
    `
  ]
})
export class AccountComponent {
  constructor(public auth: AuthService, private router: Router) {}
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

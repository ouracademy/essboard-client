import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '@core/auth.service'

@Component({
  selector: 'app-account',
  template: `
    <button mat-icon-button class="avatar" [matMenuTriggerFor]="menu">
      <mat-icon>arrow_drop_down</mat-icon>
    </button>
    <mat-menu
      class="menu-options"
      x-position="after"
      y-position="below"
      #menu="matMenu"
    >
      <button mat-menu-item routerLink="/me/projects">Mis proyectos</button>
      <button mat-menu-item (click)="logout()">Salir</button>
    </mat-menu>
  `,
  styles: [``]
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

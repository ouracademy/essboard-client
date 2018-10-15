import { Component, OnInit } from "@angular/core";
import { AuthService } from '@core/auth.service'


@Component({
  selector: "app-auth-layout",
  template: `
  <app-header>
    <right-content>
      <mat-menu class="menu-options" x-position="after" y-position="below" #menu="matMenu">
        <button mat-menu-item routerLink="/me/projects"> Mis proyectos  </button>
        <button mat-menu-item routerLink="/me/projects"> Mis competencias </button>
        <button mat-menu-item routerLink="/me/practices">Mis practicas</button>
        <button mat-menu-item> Ayuda </button>
        <button mat-menu-item routerLink="/me/settings/profile"> Configuracion </button>
        <button mat-menu-item (click)="logout()"> Salir </button>
      </mat-menu>
      <button mat-icon-button  class="avatar" [matMenuTriggerFor]="appMenu">
        <mat-icon>more_vert</mat-icon>
      </button>
    </right-content>
  </app-header>
  `
})
export class InsideLayoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {

  }
  ngOnInit() {

  }
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  get user() {
    return this.auth.user;
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/']));
  }

}

import { NgModule } from '@angular/core';
import { CommonAppModule } from "@shared/common";
import { Router } from "@angular/router";


@NgModule({
  imports: [
    CommonAppModule
  ],
  declarations: [InsideLayoutComponent],
  exports: [InsideLayoutComponent]

})
export class InsideLayoutModule { }


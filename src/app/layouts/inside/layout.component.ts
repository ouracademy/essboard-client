import { Component } from '@angular/core'

import { HeaderModule } from '@shared/header/index.module'

@Component({
  selector: 'app-inside-layout',
  template: `
    <div class="container-column viewport-full">
      <app-header mode="toolbar">
        <right-content class="row">
          <app-notifications></app-notifications>
          <app-account></app-account>
        </right-content>
      </app-header>
      <div class="pad-0-5 container-complement">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['layout.component.scss']
})
export class InsideLayoutComponent {}

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'

import { NotificationsModule } from '@shared/notifications/index.module'
import { RouterModule } from '@angular/router'
import { AccountModule } from '@shared/account/index.module'
@NgModule({
  imports: [RouterModule, HeaderModule, NotificationsModule, AccountModule],
  declarations: [InsideLayoutComponent],
  exports: [InsideLayoutComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InsideLayoutModule {}

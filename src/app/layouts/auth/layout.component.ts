import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="viewport row middle-xs center-xs">
      <img
        src="assets/images/logo/logo-horizontal.png"
        alt="Essboard"
        class="pointer"
        routerLink="/"
      />
      <div class="row middle-xs center-xs col-xs-12">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class LayoutComponent implements OnInit {
  ngOnInit() {}
}

import { NgModule } from '@angular/core'
import { CommonAppModule } from '@shared/common'

@NgModule({
  imports: [CommonAppModule, RouterModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutAuthModule {}

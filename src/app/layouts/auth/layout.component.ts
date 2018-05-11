import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-auth-layout",
  template: `
  <div  class="viewport" fxLayout="column" fxLayoutAlign="center center">
    <img src='assets/images/logo/logo-horizontal.png' alt='Essboard'>
    <ng-content></ng-content>
  </div>
  `
})
export class LayoutComponent implements OnInit {
 ngOnInit(){

 }

}

import { NgModule } from '@angular/core';
import { CommonAppModule } from "@shared/common";


@NgModule({
  imports: [
    CommonAppModule
  ],
  declarations: [LayoutComponent],
  exports : [ LayoutComponent]

})
export class LayoutAuthModule { }


import { Component, OnInit } from "@angular/core";


@Component({
  selector: "app-login",
  template: `
  <div  class="viewport" fxLayout="column" fxLayoutAlign="center center">
    <img src='assets/images/logo/logo-horizontal.png' alt='Essboard'>
    <router-outlet></router-outlet>
  </div>
  `
})
export class LayoutComponent implements OnInit {
 ngOnInit(){

 }

}

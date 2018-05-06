import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
    <div fxLayout="row wrap" fxLayoutAlign="start center">
        <a  fxFlex="30" class="brand" routerLink="/">
          <img src="assets/images/logo/logo-horizontal.png" alt="Essboard">
        </a>
        <div fxFlex="40"></div>
        <div fxFlex="30" class="p-3" fxLayout="row" fxLayoutAlign="end center">
          <ng-content select="right-content">
          </ng-content>
        </div>
    </div>
    `
})

export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

import { Component, OnInit , Input } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
    <div fxLayout="row wrap" fxLayoutAlign="start center"  [ngStyle]="{'height': mode==='toolbar'? '15vh':'20vh'}">
        <a  fxFlex="20" fxFlex.xs="40" class="brand" routerLink="/">
          <img class="responsive-width" src="assets/images/logo/logo-horizontal.png" alt="Essboard">
        </a>
        <div fxFlex="50" fxFlex.sm="30"  fxHide.xs></div>
        <div fxFlex="30" fxFlex.sm="50" fxFlex.xs="60" class="p-3" fxLayout="row" fxLayoutAlign="end center">
          <ng-content select="right-content">
          </ng-content>
        </div>
    </div>
    `
})

export class HeaderComponent implements OnInit {
    @Input() mode
    constructor() { }

    ngOnInit() {

     }
}

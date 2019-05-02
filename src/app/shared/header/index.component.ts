import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div
      fxLayout="row"
      fxLayoutAlign="space-between center"
      [ngStyle]="{ height: mode === 'toolbar' ? '10vh' : '15vh' }"
    >
      <div fxLayout="row" fxLayoutAlign="start center">
        <a class="brand" fxFlex.xs="100" routerLink="/me/projects">
          <img
            class="logo"
            src="assets/images/logo/logo-horizontal.png"
            alt="Essboard"
          />
        </a>
        <div fxFlex.xs="100">
          <ng-content select="left-content"> </ng-content>
        </div>
      </div>
      <div class="pad-1"><ng-content select="right-content"> </ng-content></div>
    </div>
  `,
  styles: [
    `
      .brand {
        height: 100%;
      }
      .logo {
        width: auto;
        height: 90%;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {
  @Input() mode
  constructor() {}

  ngOnInit() {}
}

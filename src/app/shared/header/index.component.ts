import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <div
      class="row between-xs middle-xs"
      [ngStyle]="{ height: mode === 'toolbar' ? '10vh' : '15vh' }"
    >
      <a class="brand col-xs-4 col-sm-4 " routerLink="/">
        <img
          class="responsive-width"
          src="assets/images/logo/logo-horizontal.png"
          alt="Essboard"
        />
      </a>
      <div class="p-1 row end-xs middle-xs">
        <ng-content select="right-content"> </ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .brand {
        height: 100%;
      }
    `
  ]
})
export class HeaderComponent implements OnInit {
  @Input() mode
  constructor() {}

  ngOnInit() {}
}

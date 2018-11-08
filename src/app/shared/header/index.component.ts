import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
    <div
      class="row start-xs middle-xs"
      [ngStyle]="{ height: mode === 'toolbar' ? '15vh' : '20vh' }"
    >
      <a class="brand col-xs-6 col-sm-6 " routerLink="/">
        <img
          class="responsive-width"
          src="assets/images/logo/logo-horizontal.png"
          alt="Essboard"
        />
      </a>
      <div class="p-3 row end-xs middle-xs col-xs-6 col-sm-6">
        <ng-content select="right-content"> </ng-content>
      </div>
    </div>
  `
})
export class HeaderComponent implements OnInit {
  @Input() mode
  constructor() {}

  ngOnInit() {}
}

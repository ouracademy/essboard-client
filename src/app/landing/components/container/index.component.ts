import { Component, Input, OnInit } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { AuthService } from '@core/auth.service'

@Component({
  selector: 'app-landing',
  templateUrl: 'index.component.html',
  styles: [
    `
      .icon {
        margin: 20px;
      }
      .icon-image {
        height: 100px;
        width: 100px;
        margin: auto;
        background-image: url(assets/images/kernel-icons.png);
      }

      .mat-display-3 {
        margin: 0 0 35px;
      }
    `
  ]
})
export class LandingComponent implements OnInit {
  kernelIcons = [
    { name: 'Opportunity', x: -134, y: -10 },
    { name: 'Stakeholder', x: -254, y: -130 },
    { name: 'Requirements', x: -10, y: -254 },
    { name: 'Software System', x: -10, y: -134 },
    { name: 'Team', x: -130, y: -134 },
    { name: 'Work', x: -10, y: -10 },
    { name: 'Way of working', x: -254, y: -10 }
  ]
  constructor(public auth: AuthService) {}

  getStyle(item) {
    return {
      'background-position': `${item.x}px ${item.y}px`
    }
  }

  ngOnInit() {}
}

@Component({
  selector: 'app-video',
  template: `
    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
      <iframe
        [src]="url"
        frameborder="0"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      ></iframe>
    </div>
  `
})
export class VideoComponent {
  url: SafeResourceUrl

  @Input()
  set src(arg: string) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(arg)
  }

  constructor(private sanitizer: DomSanitizer) {}
}

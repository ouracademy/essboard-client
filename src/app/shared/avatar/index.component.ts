import { Component, OnInit, Input } from '@angular/core'
import { randomColor } from '@shared/utils/random-color'
@Component({
  selector: 'app-our-avatar',
  template: `
    <ngx-avatar
      [size]="size"
      [name]="name"
      [bgColor]="color"
      [class.offline]="!isOnline"
    ></ngx-avatar>
  `,
  styles: [
    `
      .offline {
        opacity: 0.25;
      }
    `
  ]
})
export class OurAvatarComponent implements OnInit {
  @Input('user')
  set user(data) {
    this.color = randomColor(data.name, 22)
    this.name = data.name
  }
  @Input() size = 30
  @Input() isOnline
  color = ''
  name = ''
  constructor() {}

  ngOnInit() {}
}

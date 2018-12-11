import { Component, OnInit, Input } from '@angular/core'
import { randomColor } from '@shared/utils/random-color'
@Component({
  selector: 'app-our-avatar',
  template: `
    <ngx-avatar [size]="size" [name]="name" [bgColor]="color"></ngx-avatar>
  `
})
export class OurAvatarComponent implements OnInit {
  @Input('user')
  set user(data) {
    this.name = data.name
  }

  @Input() size = 30
  @Input() isOnline = true

  name = ''
  constructor() {}

  ngOnInit() {}

  get color() {
    return this.isOnline ? randomColor(this.name, 22) : '#80808030'
  }
}

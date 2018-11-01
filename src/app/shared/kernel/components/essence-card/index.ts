import { Component, Input } from '@angular/core'

@Component({
  selector: 'essence-card',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class EssenceCardComponent {
  @Input()
  name: String
  @Input()
  area: String

  mmappingAreaWithColor = {
    customer: '#c1ecc1',
    solution: '#ffff99',
    endeavor: '#d4e6f0'
  }
}

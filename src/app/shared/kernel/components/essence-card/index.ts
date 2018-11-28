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
}

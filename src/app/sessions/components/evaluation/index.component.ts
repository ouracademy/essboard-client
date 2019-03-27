import { Component } from '@angular/core'
import { EvaluationService } from 'app/sessions/services/evaluation.service'

@Component({
  selector: 'evaluation',
  templateUrl: 'index.component.html',
  styles: [
    `
      .mat-dialog-content {
        overflow: none;
        height: 100%;
      }
      h3.mat-display-4 {
        margin: 0;
      }
    `
  ]
})
export class EvaluationComponent {
  duration = 15

  constructor(private evaluations: EvaluationService) {}

  start() {
    this.evaluations.startNewOne(this.duration)
  }
}

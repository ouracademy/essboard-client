import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'session-steps',
  templateUrl: 'index.component.html',
  styles: [
    `
      .mat-tab-link {
        padding: 0px 18px;
      }
    `
  ]
})
export class StepsComponent implements OnInit {
  steps = [
    {
      label: 'See your proyect holisticly',
      path: 'holistic-view',
      icon: 'looks_one'
    },
    {
      label: 'Monitor your project',
      path: 'set-state',
      icon: 'looks_two'
    }
  ]

  constructor() {}

  ngOnInit() {}
}

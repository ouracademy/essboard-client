import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'session-steps',
  templateUrl: 'index.component.html'
})
export class StepsComponent implements OnInit {
  steps = [
    { label: 'Estado actual', path: 'holistic-view', icon: 'looks_one' },
    {
      label: 'Determina tu estado',
      path: 'set-current-state',
      icon: 'looks_two'
    }
    // { label: 'Decide como lograrlo', path: '', icon: 'looks_4' }
  ]

  //   <mat-tab>
  //   <div class="content-tab">
  //     <set-goal-state
  //       [kernel]="session.kernel"
  //       [sessionId]="session.id"
  //     ></set-goal-state>
  //   </div>
  // </mat-tab>

  // <mat-tab>
  //   <div class="content-tab">
  //     <how-reach-goals
  //       [sessionId]="session.id"
  //       [sessionNumber]="session.num"
  //     ></how-reach-goals>
  //   </div>
  // </mat-tab>

  constructor() {}

  ngOnInit() {}
}

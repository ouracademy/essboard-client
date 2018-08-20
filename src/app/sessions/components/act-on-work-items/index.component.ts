import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { Goal } from '../../../../shared/models/goal';
@Component({
  selector: 'activity-list',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ActOnWorkItems {
  @Input() goals: Goal[];
  @Input() sessionNumber : number;
  apiKey: string;
  isConectionInit: boolean = false;
  constructor(private auth: AuthService) {
  }
  initConectTrello() {
    this.apiKey = this.auth.user.appKeyTrello;
    this.isConectionInit = true;
  }
  get actions() {
    let actionsData: any[] = [];
    for (let goal of this.goals) {
      for (let action of goal.actions) {
        actionsData.push({ send: false, name: action.name });
      }
    }
    return actionsData;
  }
}



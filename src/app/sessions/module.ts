import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatIconModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatListModule
} from '@angular/material'

import 'hammerjs';
import { DragulaModule, DragulaService } from 'ng2-dragula/ng2-dragula';
import { RoutingModule } from './routing.module';



import { KernelModule } from '@shared/kernel/kernel.module';
import { UsersModule } from '../users/index.module';
import { AvatarLetterModule } from '@shared/avatar-letter/index.module';
import { SessionComponent } from './components/index.component';

/* steps for use essence in each session*/
import { HowReachGoals } from './components/how-reach-goals/index.component';
import { HowReachGoal } from './components/how-reach-goal/index.component';
import { ActOnWorkItems } from './components/act-on-work-items/index.component';
import { SetCurrentStateComponent } from './components/setCurrentState/index.component';
import { SetGoalStateComponent } from './components/setGoalState/index.component';
import { Checklist } from './components/setCurrentState/checklist/index.component';
import { DialogComponent } from './components/chatInSession/index.component';
import { TrelloComponent } from './components/act-on-work-items/migrateToTrello/index.component';
import { SessionService } from './services/session.service';
import { SessionSocketService } from './services/session-socket.service';
import { DialogService } from './services/dialog.service';
import { DialogSocketService } from './services/dialog-socket.service';
import { GoalService } from './services/goal.service';
import { GoalSocketService } from './services/goal-socket.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersModule,
    KernelModule,
    
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatListModule,

    DragulaModule,
    AvatarLetterModule,
    RoutingModule
  ],
  declarations: [
    SetCurrentStateComponent,
    SetGoalStateComponent,
    Checklist,
    SessionComponent,
    HowReachGoals,
    HowReachGoal,
    ActOnWorkItems,
    DialogComponent,
    TrelloComponent
  ],
  entryComponents: [],
  providers: [
    { provide: SessionService, useClass: SessionSocketService },
    { provide: DialogService, useClass: DialogSocketService },
    { provide: GoalService, useClass: GoalSocketService }
  ],
  exports: [
    SetCurrentStateComponent,
    SessionComponent,
    HowReachGoals,
    ActOnWorkItems,
    DialogComponent,
    TrelloComponent
  ]
})
export class Module { }
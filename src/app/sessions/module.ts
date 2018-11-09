import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
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

import 'hammerjs'

import { RoutingModule } from './routing.module'

import { KernelModule } from '@shared/kernel/kernel.module'
import { AvatarModule } from 'ngx-avatar'
import { UsersModule } from '../users/index.module'

import { SessionComponent } from './components/index.component'

/* steps for use essence in each session*/
import { HowReachGoals } from './components/how-reach-goals/index.component'
import { HowReachGoal } from './components/how-reach-goal/index.component'
import { ActOnWorkItemsComponent } from './components/act-on-work-items/index.component'
import { SetCurrentStateComponent } from './components/setCurrentState/index.component'
import { SetGoalStateComponent } from './components/setGoalState/index.component'
import { ChecklistComponent } from './components/setCurrentState/checklist/index.component'
import { ChatComponent } from './components/chatInSession/index.component'

import { OnlineUsersComponent } from './components/online-users/index.components'

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

    AvatarModule,
    RoutingModule
  ],
  declarations: [
    SetCurrentStateComponent,
    SetGoalStateComponent,
    ChecklistComponent,
    SessionComponent,
    HowReachGoals,
    HowReachGoal,
    ActOnWorkItemsComponent,
    ChatComponent,
    OnlineUsersComponent
  ],

  entryComponents: [],
  providers: [],
  exports: []
})
export class SessionModule {}

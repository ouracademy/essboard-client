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

import { UsersModule } from '../users/index.module'

import { SessionComponent } from './components/index.component'

/* steps for use essence in each session*/
import { StepsComponent } from './components/steps/index.component'
import { RadiatorInformationComponent } from './components/radiator-information/index.component'
import { SetCurrentStateComponent } from './components/set-current-state/index.component'

import { HowReachGoals } from './components/how-reach-goals/index.component'
import { HowReachGoalComponent } from './components/how-reach-goal/index.component'
import { ActOnWorkItemsComponent } from './components/act-on-work-items/index.component'

import { DetailAlphaComponent } from './components/detail-alpha/index.component'
import { SetGoalStateComponent } from './components/set-goal-state/index.component'

import { ChecklistComponent } from './components/checklist/index.component'
import { ChatComponent } from './components/chat/index.component'

import { OnlineUsersComponent } from './components/online-users/index.components'
import { OurAvatarModule } from '@shared/avatar/index.module'

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
    OurAvatarModule,
    RoutingModule
  ],
  declarations: [
    StepsComponent,
    RadiatorInformationComponent,

    SetCurrentStateComponent,
    DetailAlphaComponent,
    SetGoalStateComponent,
    ChecklistComponent,
    SessionComponent,
    HowReachGoals,
    HowReachGoalComponent,
    ActOnWorkItemsComponent,
    ChatComponent,
    OnlineUsersComponent
  ],

  entryComponents: [],
  providers: [],
  exports: []
})
export class SessionModule {}

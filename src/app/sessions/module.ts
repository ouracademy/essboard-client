import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
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
  MatListModule,
  MatSidenavModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material'
import { ContextMenuModule } from 'ngx-contextmenu'

import { DragDropModule } from '@angular/cdk/drag-drop'

import 'hammerjs'

import { RoutingModule } from './routing.module'

import { KernelModule } from '@shared/kernel/kernel.module'

import { UsersModule } from '../users/index.module'

import { SessionComponent } from './components/index.component'

/* steps for use essence in each session*/
import { StepsComponent } from './components/steps/index.component'
import { RadiatorInformationComponent } from './components/radiator-information/index.component'
import { SetStateComponent } from './components/set-state/index.component'

import { ActionsByGoalComponent } from './components/actions-by-goal/index.component'

import { DetailAlphaComponent } from './components/detail-alpha/index.component'

import { ChecklistComponent } from './components/checklist/index.component'
import { ChatComponent } from './components/chat/index.component'

import { OnlineUsersComponent } from './components/online-users/index.components'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { PreventOfflineModule } from '@shared/prevent-when-offline/index.module'
import { CheckDetailComponent } from './components/check-detail/index.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    UsersModule,
    ContextMenuModule.forRoot(),
    KernelModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    OurAvatarModule,
    PreventOfflineModule,
    DragDropModule,
    RoutingModule
  ],
  declarations: [
    SessionComponent,
    StepsComponent,
    RadiatorInformationComponent,
    DetailAlphaComponent,
    SetStateComponent,
    ChecklistComponent,
    ActionsByGoalComponent,
    ChatComponent,
    OnlineUsersComponent,
    CheckDetailComponent
  ],

  entryComponents: [CheckDetailComponent, ChatComponent],
  providers: [],
  exports: []
})
export class SessionModule {}

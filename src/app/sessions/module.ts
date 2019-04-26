import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { KernelModule } from '@shared/kernel/kernel.module'
import { PreventOfflineModule } from '@shared/prevent-when-offline/index.module'
import { ContextMenuModule } from 'ngx-contextmenu'
import {
  TimeagoCustomFormatter,
  TimeagoFormatter,
  TimeagoIntl,
  TimeagoModule
} from 'ngx-timeago'
import { UsersModule } from '../users/index.module'
import { ChatComponent } from './components/chat/index.component'
import { CheckDetailComponent } from './components/check-detail/index.component'
import { ChecklistComponent } from './components/checklist/index.component'
import { DetailAlphaComponent } from './components/detail-alpha/index.component'
import { EvaluationComponent } from './components/evaluation/index.component'
import { SessionComponent } from './components/index.component'
import { OnlineUsersComponent } from './components/online-users/index.components'
import { RadiatorInformationComponent } from './components/radiator-information/index.component'
import { SetStateComponent } from './components/set-state/index.component'
/* steps for use essence in each session*/
import { StepsComponent } from './components/steps/index.component'
import { RoutingModule } from './routing.module'

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}

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
    MatSliderModule,

    OurAvatarModule,
    PreventOfflineModule,
    DragDropModule,

    TimeagoModule.forChild({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
    }),
    RoutingModule
  ],
  declarations: [
    SessionComponent,
    StepsComponent,
    RadiatorInformationComponent,
    DetailAlphaComponent,
    SetStateComponent,
    ChecklistComponent,
    ChatComponent,
    OnlineUsersComponent,
    CheckDetailComponent,
    EvaluationComponent
  ],

  entryComponents: [CheckDetailComponent, EvaluationComponent, ChatComponent],
  providers: [],
  exports: []
})
export class SessionModule {}

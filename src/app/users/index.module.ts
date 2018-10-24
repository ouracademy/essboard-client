import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule
} from '@angular/material'
import { AvatarLetterModule } from '@shared/avatar-letter/index.module';

import { ListComponent } from './components/list/list.component';
import { UserDetailComponent } from './components/detail/detail.component';
import { ProfileUserComponent } from './components/profile/index.component';
import { ProfileSettingsComponent } from './components/settings/profile/index.component';
import { TrelloSettingsComponent } from './components/settings/trello-api/index.component';

import { indexRouting } from './index.routing';
import { UserService } from './services/user.service';
import { UserSocketService } from './services/user-socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    indexRouting,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    AvatarLetterModule
  ],
  declarations: [
    ListComponent,
    UserDetailComponent,
    ProfileUserComponent,
    ProfileSettingsComponent,
    TrelloSettingsComponent
  ],
  providers: [
    { provide: UserService, useClass: UserSocketService }
  ],
  exports: [
    ListComponent, UserDetailComponent, ProfileUserComponent,
    ProfileSettingsComponent, TrelloSettingsComponent
  ]
})
export class UsersModule { }
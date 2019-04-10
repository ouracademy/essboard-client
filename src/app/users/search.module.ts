import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatAutocompleteModule
} from '@angular/material'

import { SearchComponent } from './components/search/search.component'

import { indexRouting } from './index.routing'
import { UserSearchSocketService } from './services/user-search-socket.service'
import { OurAvatarModule } from '@shared/avatar/index.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    indexRouting,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    OurAvatarModule,
    MatAutocompleteModule
  ],
  declarations: [SearchComponent],
  providers: [UserSearchSocketService],
  exports: [SearchComponent]
})
export class SearchUsersModule {}

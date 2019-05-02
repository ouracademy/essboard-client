import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from '@angular/material'
import { OurAvatarModule } from '@shared/avatar/index.module'
import { LoadingWhenClickedModule } from '@shared/loading-when-clicked'
import { SearchComponent } from './components/search/search.component'
import { indexRouting } from './index.routing'
import { UserSearchSocketService } from './services/user-search-socket.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    indexRouting,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    OurAvatarModule,
    MatAutocompleteModule,
    LoadingWhenClickedModule
  ],
  declarations: [SearchComponent],
  providers: [UserSearchSocketService],
  exports: [SearchComponent]
})
export class SearchUsersModule {}

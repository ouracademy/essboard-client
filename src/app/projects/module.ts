import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { 
  MatCardModule,
  MatButtonModule,
  // TODO: only used in new component (move to its own module)
  MatFormFieldModule,
  MatInputModule, 
  MatRadioModule,
  MatIconModule
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms'


import { LoadingModule } from '../shared/loading/loading.module';
import { RoutingModule } from './routing.module';



import { ProjectsComponent } from './portfolio/projects.component'
import { NewComponent } from './new/new.component';


@NgModule({
  imports: [
    CommonModule,
    
    ReactiveFormsModule,
    
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatRadioModule,
    MatIconModule,
    FlexLayoutModule,
    
    LoadingModule,
    RoutingModule
  ],
  declarations: [
    ProjectsComponent,
    NewComponent
  ],
  exports: [ProjectsComponent]
})
export class Module { }

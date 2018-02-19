import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material'
import { ProjectsComponent } from './projects.component'
import { LoadingModule } from '../shared/loading/loading.module';
import { RoutingModule } from './routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    LoadingModule,
    RoutingModule
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent]
})
export class Module { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material'
import { ProjectsComponent } from './projects.component'
import { LoadingModule } from '../shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    LoadingModule
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent]
})
export class ProjectsModule { }

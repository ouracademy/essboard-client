import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectsModule } from './module';

const routes: Routes = [
  {path: '', component: ProjectsComponent}
];

@NgModule({
  imports: [
    ProjectsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

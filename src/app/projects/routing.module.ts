import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './portfolio/projects.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'new', component: NewComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

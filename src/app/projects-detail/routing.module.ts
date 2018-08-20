import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './portfolio/projects.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: 'new', component: NewComponent},
  {path: 'see/:id', component: DetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent, DetailComponent } from './components';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: DetailComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class RoutingModule { }

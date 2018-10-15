import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SessionComponent } from './components/index.component';


const routes: Routes = [
  { path: ':id', component: SessionComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

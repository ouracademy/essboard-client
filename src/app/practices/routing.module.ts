import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PracticesComponent } from './practices.component';


const routes: Routes = [
    { path: '', component: PracticesComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

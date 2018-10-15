import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@core/auth-guard.service';
import { ProjectListComponent, ProjectDetailComponent } from './components';
import { InsideLayoutComponent } from '@layouts/inside/layout.component'

const routes: Routes = [
{
  path: '',
  component: InsideLayoutComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', component: ProjectListComponent },
    { path: ':id', component: ProjectDetailComponent }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: 'app/landing/index.module#LandingModule' }
    ]
  },
  {
    path: 'projects',
    children: [
      { path: '', loadChildren: 'app/projects/module#Module' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

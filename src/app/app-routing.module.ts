import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: 'app/landing/index.module#LandingModule' },
      { path: 'login', loadChildren: 'app/login/index.module#LoginModule' }
    ]
  },
  {
    path: 'me',
    children: [
      { path: 'projects', loadChildren: 'app/projects/module#Module' },
      { path: 'sessions', loadChildren: 'app/sessions/module#Module' },
      { path: 'practices', loadChildren: 'app/practices/module#Module'}
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

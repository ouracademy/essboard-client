import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: 'app/landing/index.module#LandingModule' },
      { path: 'login', loadChildren: 'app/login/index.module#LoginModule' },
      { path: 'signup', loadChildren: 'app/signup/index.module#SignupModule' }
    ]
  },

  {
    path: 'me',
    loadChildren: 'app/inside.module#InsideRoutingModule'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from '@core/auth-guard.service'
import { LandingGuardService } from '@core/landing-guard.service'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [LandingGuardService],
        loadChildren: 'app/landing/index.module#LandingModule'
      },
      { path: 'login', loadChildren: 'app/login/index.module#LoginModule' },
      { path: 'signup', loadChildren: 'app/signup/index.module#SignupModule' }
    ]
  },

  {
    path: 'me',
    loadChildren: 'app/inside.module#InsideRoutingModule',
    canActivate: [AuthGuardService]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

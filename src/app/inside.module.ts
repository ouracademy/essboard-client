import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InsideLayoutComponent } from '@layouts/inside/layout.component'
import { PROVIDERS_PROJECT } from './projects/providers.module'
import { PROVIDERS_SESSION } from './sessions/providers.module'

const routes: Routes = [
  {
    path: 'me',
    component: InsideLayoutComponent,
    children: [
      { path: 'projects', loadChildren: 'app/projects/module#Module' },
      { path: 'sessions', loadChildren: 'app/sessions/module#Module' },
      { path: 'practices', loadChildren: 'app/practices/module#Module' }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [...PROVIDERS_PROJECT, ...PROVIDERS_SESSION]
})
export class AppRoutingModule {}

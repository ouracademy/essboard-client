import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InsideLayoutModule } from '@layouts/inside'
import { InsideLayoutComponent } from '@layouts/inside/layout.component'
import { PROVIDERS_PROJECT } from './projects/providers.module'
import { PROVIDERS_SESSION } from './sessions/providers.module'
import { MembersService } from './members/members.service'

const routes: Routes = [
  {
    path: '',
    component: InsideLayoutComponent,
    children: [
      { path: 'projects', loadChildren: 'app/projects/module#ProjectModule' },
      { path: 'sessions', loadChildren: 'app/sessions/module#SessionModule' }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes), InsideLayoutModule],
  exports: [RouterModule],
  providers: [...PROVIDERS_PROJECT, ...PROVIDERS_SESSION, MembersService]
})
export class InsideRoutingModule {}

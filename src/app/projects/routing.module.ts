import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectPortfolioComponent, ProjectDetailComponent } from './components'

const routes: Routes = [
  { path: '', component: ProjectPortfolioComponent },
  { path: ':id', component: ProjectDetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule {}

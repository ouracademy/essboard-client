import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CanDeactivateGuard } from './services/leave-session.guard'
import { SessionComponent } from './components/index.component'

const enableChannelsSubscription = false

const routes: Routes = [
  {
    path: ':id',
    canDeactivate: enableChannelsSubscription ? [CanDeactivateGuard] : [],
    component: SessionComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [CanDeactivateGuard]
})
export class RoutingModule {}

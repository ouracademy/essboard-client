import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CanDeactivateGuard } from './services/leave-session.guard'
import { SessionComponent } from './components/index.component'
import { RadiatorInformationComponent } from './components/radiator-information/index.component'
import { SetCurrentStateComponent } from './components/set-current-state/index.component'
import { DetailAlphaComponent } from './components/detail-alpha/index.component'

const enableChannelsSubscription = true

const routes: Routes = [
  {
    path: ':id',
    canDeactivate: enableChannelsSubscription ? [CanDeactivateGuard] : [],
    component: SessionComponent,

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'holistic-view' },
      { path: 'holistic-view', component: RadiatorInformationComponent },
      {
        path: 'set-current-state',
        children: [
          { path: '', pathMatch: 'full', component: SetCurrentStateComponent },
          { path: ':id', component: DetailAlphaComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [CanDeactivateGuard]
})
export class RoutingModule {}

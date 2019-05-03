import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DetailAlphaComponent } from './components/detail-alpha/index.component'
import { SessionComponent } from './components/index.component'
import { RadiatorInformationComponent } from './components/radiator-information/index.component'
import { SetStateComponent } from './components/set-state/index.component'
import { CanDeactivateGuard } from './services/leave-session.guard'

const enableChannelsSubscription = true

const routes: Routes = [
  {
    path: ':id',
    canDeactivate: enableChannelsSubscription ? [CanDeactivateGuard] : [],
    component: SessionComponent,

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'set-state' },
      { path: 'holistic-view', component: RadiatorInformationComponent },
      {
        path: 'set-state',
        component: SetStateComponent,
        children: [
          {
            path: ':id',
            component: DetailAlphaComponent
          }
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

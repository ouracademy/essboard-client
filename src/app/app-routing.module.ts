import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core-module/auth-guard.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: 'app/landing/index.module#LandingModule' },
      { path: 'login', loadChildren: 'app/login/index.module#LoginModule' }
    ]
  },
  {
    path: 'projects',
    children: [
      { path: '', loadChildren: 'app/projects/module#Module' }
    ]
  },
  {
    path: 'me',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'projects', loadChildren: 'app/projects/module#Module' },
      { path: 'projects/:id', component: ProjectDetailComponent },
      { path: 'sessions/:id', component: SessionComponent },
      { path: 'practices', component: PracticesComponent },
      {
        path: 'settings',
        component: LayoutSettingsComponent,
        children: [
          { path: 'profile', component: ProfileSettingsComponent },
          { path: 'trello', component: TrelloSettingsComponent },
          { path: 'competencies', component: ProfileSettingsComponent },
        ]
      }
    ]
  },
  {
    path: 'profile',
    component: LayoutComponent,
    children: [
      { path: ':username', component: ProfileUserComponent }]
  }];



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

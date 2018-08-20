import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthGuardService } from '../../auth-guard.service';
import { LayoutComponent, LayoutSettingsComponent, DeveloperComponent } from './index';
import { ProjectListComponent, ProjectDetailComponent } from '../../modules/projects/index';
import { SessionComponent } from '../../modules/sessions/index';
import { PracticesComponent } from '../../modules/practices/index';
import { ProfileUserComponent, ProfileSettingsComponent, TrelloSettingsComponent } from '../../modules/users/index';


export const DeveloperRoutes: Route[] = [
  {
    path: 'me',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: DeveloperComponent },
      { path: 'projects', component: ProjectListComponent },
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

export const developerRouting: ModuleWithProviders = RouterModule.forChild(DeveloperRoutes);





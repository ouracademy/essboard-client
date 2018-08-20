import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';

export const LandingRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'signup',
    component: SignupComponent
  }
];

export const landingRouting: ModuleWithProviders = RouterModule.forChild(LandingRoutes);





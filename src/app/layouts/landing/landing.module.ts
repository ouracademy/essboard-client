import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SharedModule } from '../../shared/shared.module';
import { landingRouting } from './landing.routes';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    DragulaModule,
    SharedModule,
    landingRouting,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class LandingModule { }

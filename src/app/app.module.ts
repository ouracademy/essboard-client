import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderModule } from '@shared/header/index.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HeaderModule,
    MatButtonModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas:[ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { InsideLayoutModule  } from '@layouts/inside'
import { CoreModule } from './core-module/index.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    AppRoutingModule,
    InsideLayoutModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

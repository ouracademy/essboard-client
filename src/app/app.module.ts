import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, registerLocaleData } from '@angular/common'

import { CoreModule } from './core-module/index.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import localeEs from '@angular/common/locales/es'
import { LoadingClickService } from '@shared/loading-when-clicked'
import { GestureConfig } from '@angular/material'
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { Angulartics2Module } from 'angulartics2'

registerLocaleData(localeEs)

@NgModule({
  imports: [
    BrowserAnimationsModule,

    CommonModule,
    CoreModule,
    AppRoutingModule,

    Angulartics2Module.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    LoadingClickService,
    {
      // See https://github.com/angular/material2/issues/4278#issuecomment-317832711

      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

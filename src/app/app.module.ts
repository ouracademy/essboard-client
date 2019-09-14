import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { GestureConfig } from '@angular/material'
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoadingClickService } from '@shared/loading-when-clicked'
import { Angulartics2Module } from 'angulartics2'
import { TimeagoModule } from 'ngx-timeago'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core-module/index.module'

@NgModule({
  imports: [
    BrowserAnimationsModule,

    CommonModule,
    CoreModule,
    AppRoutingModule,

    Angulartics2Module.forRoot(),
    TimeagoModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
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

import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, registerLocaleData } from '@angular/common'

import { CoreModule } from './core-module/index.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import localeEs from '@angular/common/locales/es'
registerLocaleData(localeEs)

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {}

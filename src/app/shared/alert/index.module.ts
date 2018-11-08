import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
  InjectionToken
} from '@angular/core'
import { CommonModule } from '@angular/common'

import { IndexComponent } from './container/index.component'
import { AlertService } from './services/alert.service'

export interface AlertToken {
  config: any
  defaults: any
}
class DefaultGlobalConfig {
  timeOut = 5000
}

export const ALERT_CONFIG = new InjectionToken<AlertToken>('AlertConfig')

@NgModule({
  imports: [CommonModule],
  declarations: [IndexComponent]
})
export class AlertModule {
  constructor(@Optional() @SkipSelf() parentModule: AlertModule) {
    if (parentModule) {
      throw new Error(
        "AlertModule is already loaded. It should only be imported in your application's main module."
      )
    }
  }
  static forRoot(config = {}): ModuleWithProviders {
    return {
      ngModule: AlertModule,
      providers: [
        AlertService,
        {
          provide: ALERT_CONFIG,
          useValue: { config, defaults: DefaultGlobalConfig }
        }
      ]
    }
  }
}

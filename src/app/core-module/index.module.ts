import { NgModule } from '@angular/core';
import { AuthService } from './auth.service'
import { AuthGuardService } from './auth-guard.service'
import { SharedService } from './shared.service'
import { SocketService } from './socket.service'
import { NgxAlertsModule } from '@ngx-plus/ngx-alerts'
@NgModule({
    imports: [
        NgxAlertsModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [ AuthGuardService, SocketService, AuthService, SharedService ]
})
export class CoreModule { }


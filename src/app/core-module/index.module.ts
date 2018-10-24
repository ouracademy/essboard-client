import { NgModule } from '@angular/core';
import { AuthService } from './auth.service'
import { AuthGuardService } from './auth-guard.service'
import { SharedService } from './shared.service'
import { SocketService } from './socket.service'
import { NgxAlertsModule } from '@ngx-plus/ngx-alerts'
import { NotificationService } from './notification.service';
@NgModule({
    imports: [
        NgxAlertsModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [AuthGuardService, SocketService, AuthService, SharedService, NotificationService]
})
export class CoreModule { }


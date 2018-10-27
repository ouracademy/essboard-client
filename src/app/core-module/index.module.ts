import { NgModule } from '@angular/core';
import { AuthService } from './auth.service'
import { AuthGuardService } from './auth-guard.service'
import { SharedService } from './shared.service'
import { SocketService } from './socket.service'
import { NgxAlertsModule } from '@ngx-plus/ngx-alerts'
import { NotificationService } from './notification.service';
import { KernelService } from './kernel-knowledge.service';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        NgxAlertsModule.forRoot(),
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [AuthGuardService, SocketService, AuthService, SharedService, NotificationService, KernelService]
})
export class CoreModule { }


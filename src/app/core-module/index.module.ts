import { NgModule } from '@angular/core';
import { AuthService } from './auth.service'
import { SharedService } from './shared.service'
import { SocketService } from './socket.service'
import { NgxAlertsModule } from '@ngx-plus/ngx-alerts'
@NgModule({
    imports: [
        NgxAlertsModule.forRoot()
    ],
    exports: [],
    declarations: [],
    providers: [ SocketService, AuthService, SharedService ]
})
export class CoreModule { }


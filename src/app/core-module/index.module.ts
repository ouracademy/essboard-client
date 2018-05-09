import { NgModule } from '@angular/core';
import { AuthService } from './auth.service'
import { SharedService } from './shared.service'

@NgModule({
    imports: [

    ],
    exports: [],
    declarations: [],
    providers: [ AuthService, SharedService ]
})
export class CoreModule { }


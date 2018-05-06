import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '@shared/common'
import { HeaderComponent } from './index.component';



@NgModule({
    imports: [
        CommonAppModule,RouterModule],
    exports: [ HeaderComponent ],
    declarations: [HeaderComponent]
})
export class HeaderModule { }


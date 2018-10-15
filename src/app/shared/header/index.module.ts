import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '@shared/common'
import { HeaderComponent } from './index.component';



@NgModule({
    imports: [
        CommonModule,CommonAppModule,RouterModule],
    exports: [ HeaderComponent ],
    declarations: [HeaderComponent]
})
export class HeaderModule { }


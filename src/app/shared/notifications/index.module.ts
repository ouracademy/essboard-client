import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '@shared/common'
import { NotificationsComponent } from './index.component';
import { MatIconModule, MatButtonModule, MatBadgeModule } from '@angular/material'


@NgModule({
    imports: [
        CommonModule,CommonAppModule,RouterModule, MatIconModule,MatButtonModule, MatBadgeModule],
    exports: [ NotificationsComponent ],
    declarations: [NotificationsComponent]
})
export class NotificationsModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '@shared/common'
import { NotificationsComponent } from './index.component';
import { MatIconModule, MatButtonModule, MatMenuModule, MatBadgeModule } from '@angular/material'


@NgModule({
    imports: [
        CommonModule,CommonAppModule,RouterModule, MatMenuModule, MatIconModule,MatButtonModule, MatBadgeModule],
    exports: [ NotificationsComponent ],
    declarations: [NotificationsComponent]
})
export class NotificationsModule { }


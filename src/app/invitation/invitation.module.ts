import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatButtonModule } from '@angular/material'
import { RouterModule, Routes } from '@angular/router'
import { InvitationComponent } from './invitation.component'

const routes: Routes = [{ path: '', component: InvitationComponent }]

@NgModule({
  declarations: [InvitationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class InvitationModule {}

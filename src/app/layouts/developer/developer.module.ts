import { NgModule } from '@angular/core';
import { MatToolbarModule, MatListModule, MatIconModule } from '@angular/material';
import { LayoutComponent,LayoutSettingsComponent,DeveloperComponent } from './index';


 
@NgModule({
  imports: [
    MatToolbarModule, MatListModule, MatIconModule
  ],
  declarations: [LayoutComponent,LayoutSettingsComponent,DeveloperComponent]
})
export class DeveloperModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LayoutComponent,LayoutSettingsComponent,DeveloperComponent } from './index';
import { developerRouting } from './developer.routes';
import { ProjectsModule } from '../../modules/projects/projects.module';
import { PracticesModule } from '../../modules/practices/index.module';
import { UsersModule } from '../../modules/users/index.module';
 
@NgModule({
  imports: [
    SharedModule,
    ProjectsModule,
    developerRouting,
    UsersModule,
    PracticesModule
  ],
  declarations: [LayoutComponent,LayoutSettingsComponent,DeveloperComponent]
})
export class DeveloperModule { }

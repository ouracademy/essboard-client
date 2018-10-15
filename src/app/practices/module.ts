import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticesComponent } from './practices.component';
import { RelationshipSpaceAlpha } from './components/relationshipAlphaSpace/index';
import { PracticesCatalog } from './components/catalog/index';
import { KernelModule } from '@shared/kernel/kernel.module';
@NgModule({
  imports: [
    CommonModule,KernelModule
  ],
  declarations: [PracticesComponent,RelationshipSpaceAlpha,PracticesCatalog],
  providers : [ ]
})
export class PracticesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticesComponent } from './practices.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';//ayudame aqui no esoty poniendo bien la ruta
import { RelationshipSpaceAlpha } from './components/relationshipAlphaSpace/index';
import { PracticesCatalog } from './components/catalog/index';
import { KernelModule } from '../../shared/modules/kernel/kernel.module';
@NgModule({
  imports: [
    CommonModule,ChartsModule,KernelModule
  ],
  declarations: [PracticesComponent,RelationshipSpaceAlpha,PracticesCatalog],
  providers : [ ]
})
export class PracticesModule { }

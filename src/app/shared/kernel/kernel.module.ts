import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import {
  MatCardModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material'
import { AlphaCardComponent } from './components/alpha-card/index'
import { EssenceCardComponent } from './components/essence-card/index'
import { RadarChartComponent } from './components/kernel-views/index'
import { RowAlphaStatesComponent } from './components/row-alpha-states/index'
import { StateCardViewComponent } from './components/state-card-view/index'

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  declarations: [
    EssenceCardComponent,
    StateCardViewComponent,
    AlphaCardComponent,
    RowAlphaStatesComponent,
    RadarChartComponent
  ],
  exports: [
    EssenceCardComponent,
    StateCardViewComponent,
    AlphaCardComponent,
    RowAlphaStatesComponent,
    RadarChartComponent
  ],
  providers: []
})
export class KernelModule {}

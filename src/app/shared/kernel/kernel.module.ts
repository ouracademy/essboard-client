import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule, MatIconModule } from '@angular/material'

import { EssenceCardComponent } from './components/essence-card/index'
import { StateCardViewComponent } from './components/state-card-view/index'
import { AlphaCardComponent } from './components/alpha-card/index'
import { RowAlphaStatesComponent } from './components/row-alpha-states/index'
import { RadarChartComponent } from './components/kernel-views/index'

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule],
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

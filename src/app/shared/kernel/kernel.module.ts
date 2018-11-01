import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule, MatIconModule } from '@angular/material'

import { EssenceCard } from './components/essence-card/index'
import { StateCardView } from './components/state-card-view/index'
import { AlphaCardComponent } from './components/alpha-card/index'
import { RowAlphaStates } from './components/row-alpha-states/index'
import {
  AlphaConnections,
  RadarChartComponent
} from './components/kernel-views/index'
import { StateBoard } from './components/state-board/index'

// services
import { ActivitySpaceMockService } from './services/mock-activity-spaces/index.service'
import { PrimaryKernelMockService } from './services/mock-primary-kernel/index.service'
import { StateMockService } from './services/mock-states/index.service'
import { AlphaMockService } from './services/mock-alphas/index.service'
import { PracticeMockService } from './services/mock-practices/index.service'
@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule],
  declarations: [
    EssenceCard,
    StateCardView,
    AlphaCardComponent,
    RowAlphaStates,
    AlphaConnections,
    RadarChartComponent,
    StateBoard
  ],
  exports: [
    EssenceCard,
    StateCardView,
    AlphaCardComponent,
    RowAlphaStates,
    RadarChartComponent,
    AlphaConnections,
    StateBoard
  ],
  providers: [
    PracticeMockService,
    ActivitySpaceMockService,
    PrimaryKernelMockService,
    AlphaMockService,
    StateMockService
  ]
})
export class KernelModule {}

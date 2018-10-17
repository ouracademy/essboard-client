import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { EssenceCard } from './components/essence-card/index';
import { StateCardView } from './components/state-card-view/index';
import { AlphaCard } from './components/alpha-card/index';
import { RowAlphaStates } from './components/row-alpha-states/index';
import {
  KernelViewHolistic,
  AlphaConnections
} from './components/kernel-views/index';
import { StateBoard } from './components/state-board/index';
//services
import { ActivitySpaceMockService } from './services/mock-activity-spaces/index.service';
import { PrimaryKernelMockService } from './services/mock-primary-kernel/index.service';
import { StateMockService } from './services/mock-states/index.service';
import { AlphaMockService } from './services/mock-alphas/index.service';
import { PracticeMockService } from './services/mock-practices/index.service';
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,MatIconModule,
    ChartsModule
  ],
  declarations: [
    EssenceCard,
    StateCardView,
    AlphaCard,
    RowAlphaStates,
    KernelViewHolistic,
    AlphaConnections,
    StateBoard
  ],
  exports: [
    EssenceCard,
    StateCardView,
    AlphaCard,
    RowAlphaStates,
    KernelViewHolistic,
    AlphaConnections,
    StateBoard
  ],
  providers : [ PracticeMockService,ActivitySpaceMockService,PrimaryKernelMockService,AlphaMockService,StateMockService]
})
export class KernelModule { }

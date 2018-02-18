import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material'
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class LoadingModule { }

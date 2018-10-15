import { NgModule } from '@angular/core';
import { AvatarLetterComponent } from './components/avatar-letter/index.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvatarLetterComponent
  ],
  exports: [
    AvatarLetterComponent
  ]
})
export class AvatarLetterModule { }

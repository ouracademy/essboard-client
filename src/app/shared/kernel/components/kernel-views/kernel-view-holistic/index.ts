import { Component, Input } from '@angular/core';
import { Kernel, Alpha } from '../../../model/kernel';

@Component({
  selector: 'kernel-view-holistic',
  templateUrl: 'index.html',
})
export class KernelViewHolistic {
  selectDimension: any = null;
  @Input() kernel: Kernel;

  showCardStatesOfDimension(dimension : Alpha) {
    this.selectDimension = dimension;
  }
}

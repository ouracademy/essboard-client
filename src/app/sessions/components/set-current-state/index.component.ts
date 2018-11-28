import { Component, OnInit } from '@angular/core'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/kernel'

@Component({
  selector: 'set-current-state',
  templateUrl: 'index.component.html'
})
export class SetCurrentStateComponent implements OnInit {
  alphas: AlphaTemplate[]
  selectedAlpha: AlphaTemplate = null

  constructor(public kernelService: KernelService) {}

  ngOnInit() {
    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })
  }

  handleSelectionAlpha(alpha: any) {
    this.selectedAlpha = alpha
  }
}

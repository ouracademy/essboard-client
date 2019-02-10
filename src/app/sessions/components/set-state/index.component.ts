import { Component, OnInit } from '@angular/core'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/kernel'

@Component({
  selector: 'set-state',
  templateUrl: 'index.component.html'
})
export class SetStateComponent implements OnInit {
  alphas: AlphaTemplate[]
  selectedAlpha: AlphaTemplate = null
  isCurrentStateDefined = false // read from backend

  constructor(public kernelService: KernelService) {}

  defineCurrentState() {
    this.isCurrentStateDefined = true
    //set in backend  isCurrentStateDefined = true
  }

  ngOnInit() {
    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })
  }

  handleSelectionAlpha(alpha: any) {
    this.selectedAlpha = alpha
  }
}

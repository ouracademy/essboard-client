import { Component, OnInit } from '@angular/core'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/kernel'

@Component({
  selector: 'set-state',
  templateUrl: 'index.component.html'
})
export class SetStateComponent implements OnInit {
  alphas: AlphaTemplate[]

  constructor(public kernelService: KernelService) {}

  ngOnInit() {
    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })
  }
}

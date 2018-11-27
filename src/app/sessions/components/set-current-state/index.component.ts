import { Component, OnInit, HostListener } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from '../../services/session.service'
import { PrimaryKernelMockService } from '@shared/kernel/services/index'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/index.component'

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

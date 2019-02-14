import { Component, OnInit } from '@angular/core'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/kernel'
import { EvaluationService } from 'app/sessions/services/evaluation.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'set-state',
  templateUrl: 'index.component.html'
})
export class SetStateComponent implements OnInit {
  alphas: AlphaTemplate[]
  isEvaluating = false

  constructor(
    public kernelService: KernelService,
    public sharedService: SharedService,
    public evaluations: EvaluationService
  ) {}

  ngOnInit() {
    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })

    this.evaluations.evaluationStatus.subscribe(isEvaluating => {
      const content = isEvaluating
        ? {
            type: 'info',
            message: 'Estas en plena evaluación'
          }
        : null
      this.sharedService.showToast(content)
      this.isEvaluating = isEvaluating
    })
  }
  startEvaluation() {
    this.evaluations.startNewOne()
  }
  stopEvaluation() {
    this.evaluations.stop()
  }
}

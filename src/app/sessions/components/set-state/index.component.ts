import { Component, OnInit } from '@angular/core'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/kernel'
import { SessionService } from 'app/sessions/services/session.service'

@Component({
  selector: 'set-state',
  templateUrl: 'index.component.html'
})
export class SetStateComponent implements OnInit {
  alphas: AlphaTemplate[]
  timeEvaluating = false
  canStartEval = false
  constructor(
    public kernelService: KernelService,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })

    // this.sessionService.currentSession$.subscribe(({ timeEvaluating }) => {
    //   this.timeEvaluating = timeEvaluating
    // })
  }
  startEvaluation() {
    this.sessionService.startEvaluation()
  }
  stopEvaluation() {
    this.sessionService.stopEvaluation()
  }
}

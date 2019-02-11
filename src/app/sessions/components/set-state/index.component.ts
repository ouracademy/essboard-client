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
  isCurrentStateDefined = false
  canMarkStateAsDefined = false

  constructor(
    public kernelService: KernelService,
    private sessionService: SessionService
  ) {}

  changeModeState(modeStateDefinition) {
    this.sessionService.setModeStateDefinition(modeStateDefinition)
  }
  defineCurrentState() {
    this.canMarkStateAsDefined &&
      this.sessionService.markCurrentStateAsDefined()
  }

  ngOnInit() {
    this.sessionService.currentSession$.subscribe(
      session => (this.isCurrentStateDefined = session.isCurrentStateDefined)
    )
    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })
  }

  handleSelectionAlpha() {
    this.isCurrentStateDefined = true
  }
}

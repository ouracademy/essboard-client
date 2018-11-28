import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'

import { ActivatedRoute } from '@angular/router'
import { AlphaTemplate, StateTemplate } from './kernel'

@Component({
  selector: 'detail-alpha',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class DetailAlphaComponent implements OnInit {
  alphaTemplate: AlphaTemplate
  states: any
  stateTemplate: StateTemplate

  @ViewChild('player')
  public playerContainer: ElementRef

  constructor(
    private sessions: SessionService,
    private activeRoute: ActivatedRoute,
    private kernel: KernelService
  ) {}

  ngOnInit() {
    this.sessions.currentState$.subscribe(
      stateTemplate => (this.stateTemplate = stateTemplate)
    )
    // yap diaaaana vas a tener q compartirme tu pantalla
    // diaaanaap :) ya te esty llmanaod
    // intentemoa a nivel de alpha escuchar cambios

    /*
this.sessions.currentAlpha$.subscribe(states => {
  this.states = states  // [ { statys achaives id 11}]
})

votes created sent to channel   sessionId/alphaId  emit  voto  
join a  sessionId/alphaId when entry this component
listen votes created -->  get state x alpha --> currentAlpha$
leave  when  exit from current route
*/

    this.activeRoute.params.subscribe(params => {
      this.kernel.getAlpha(params['id']).subscribe(alphaTemplate => {
        this.alphaTemplate = alphaTemplate
        this.sessions.getAlpha(this.alphaTemplate).subscribe(states => {
          this.states = states
        })
      })
    })
  }

  onSelectedState(template: StateTemplate) {
    this.kernel.getCheckpoints(template.id).subscribe(checklist => {
      template.checklist = checklist
      this.sessions.state = template
    })
  }
}

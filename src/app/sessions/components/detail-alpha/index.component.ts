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
    // get
    this.sessions.state = template
    //   this.playerContainer.nativeElement.play()
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'

import { ActivatedRoute, Params } from '@angular/router'
import { AlphaTemplate, StateTemplate } from './kernel'

import { flatMap } from 'rxjs/operators'

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
    private sessionService: SessionService,
    private activeRoute: ActivatedRoute,
    private kernel: KernelService
  ) {}

  ngOnInit() {
    this.sessionService.currentState$.subscribe(
      stateTemplate => (this.stateTemplate = stateTemplate)
    )

    this.sessionService.currentAlpha$.subscribe(({ states }) => {
      this.states = states
    })

    this.activeRoute.params
      .pipe(flatMap((params: Params) => this.kernel.getAlpha(params['id'])))
      .subscribe((alphaTemplate: AlphaTemplate) => {
        this.alphaTemplate = alphaTemplate
        this.sessionService.selectedAlpha = alphaTemplate
        this.sessionService.selectedState = null
      })
  }

  onSelectedState(template: StateTemplate) {
    this.kernel.getCheckpoints(template.id).subscribe(checklist => {
      template.checklist = checklist
      this.sessionService.selectedState = template
    })
  }
}

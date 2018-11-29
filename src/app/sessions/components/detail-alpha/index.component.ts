import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'

import { ActivatedRoute, Params } from '@angular/router'
import { AlphaTemplate, StateTemplate } from './kernel'
import { CanLeaveChannel } from 'app/sessions/services/leave-session.guard'
import { Observable } from 'rxjs/Observable'
import { ChannelService } from 'app/sessions/services/channel.service'
import { flatMap } from 'rxjs/operators'
import { timer, combineLatest, of } from 'rxjs'

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
    private kernel: KernelService,
    private channels: ChannelService
  ) {}

  ngOnInit() {
    this.sessions.currentState$.subscribe(
      stateTemplate => (this.stateTemplate = stateTemplate)
    )

    this.sessions.currentAlpha$.subscribe(({ states }) => {
      this.states = states
    })

    this.activeRoute.params
      .pipe(flatMap((params: Params) => this.kernel.getAlpha(params['id'])))
      .subscribe((alphaTemplate: AlphaTemplate) => {
        this.alphaTemplate = alphaTemplate
        this.sessions.setSelectedAlpha(alphaTemplate)
      })
  }

  onSelectedState(template: StateTemplate) {
    this.kernel.getCheckpoints(template.id).subscribe(checklist => {
      template.checklist = checklist
      this.sessions.state = template
    })
  }
}

import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'

import { ActivatedRoute } from '@angular/router'
import { AlphaTemplate, StateTemplate } from './kernel'

export interface FullAlphaTemplate {
  id: string
  name: string
  area: string
  states: any[]
}

export interface Alpha {
  _id: any
  knowledgeId: number
  // currentState: { knowledgeId: String }, // calculated
  // isTouched?: boolean
  states: State[]
  template: AlphaTemplate
}
type Status = 'todo' | 'doing' | 'done'

export interface State {
  _id: any
  knowledgeId: string
  status: string
  alphaId: string
  votes?: any[]
  checklist?: Checkpoint[]
}
export interface Checkpoint {
  favorablesVotes: any[]
  knowledgeId: string
}

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
          console.log({
            alphaTemplate: this.alphaTemplate,
            states: this.states
          })
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

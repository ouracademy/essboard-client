import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { Session } from '@no-module/models/project'
import { map, skip } from 'rxjs/operators'
import memoize from 'lodash/fp/memoize'

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  BiTypedMethodDecorator1
} from 'lodash-decorators/factory'
import { MemoizeApplicator } from 'lodash-decorators/applicators'
import { MemoizeConfig } from 'lodash-decorators/shared'

export const Memoize = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator(), {
    getter: true,
    optionalParams: true
  })
) as BiTypedMethodDecorator1<ResolvableFunction | MemoizeConfig<any, any>>
export { Memoize as memoize }
export default Memoize

export class AlphaTemplate {
  constructor(
    public id: string,
    public name: string,
    public area: string,
    private service: KernelService
  ) {}

  @Memoize()
  get states() {
    return this.service.getStates(this.id)
  }
}

export class StateTemplate {
  constructor(
    public id: string,
    public name: string,
    public previousId: string,
    public service: KernelService
  ) {}

  @Memoize()
  get cardCheckpoints() {
    return this.checkpoints.pipe(
      map(checkpoints => checkpoints.filter(x => x.isVisibleInCard))
    )
  }

  @Memoize()
  get checkpoints() {
    return this.service.getCheckpoints(this.id)
  }
}

export interface CheckpointTemplate {
  id: string
  name: string
  description: string
  isVisibleInCard: string
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
  @Input('alpha')
  set _alpha(arg: AlphaTemplate) {
    this.service.getAlpha(arg).subscribe(states => {
      this.states = states
    })

    this.alphaTemplate = arg
    this.reset()
  }

  states: any
  alpha: Alpha
  alphaTemplate: AlphaTemplate

  @ViewChild('player')
  public playerContainer: ElementRef
  stateTemplate: StateTemplate
  projectState = null

  constructor(private service: SessionService) {}

  ngOnInit() {
    this.service.currentState$.subscribe(
      stateTemplate => (this.stateTemplate = stateTemplate)
    )
  }

  reset() {
    this.stateTemplate = null
  }

  onSelectedState(template: StateTemplate) {
    this.service.state = template
    //   this.playerContainer.nativeElement.play()
  }
}

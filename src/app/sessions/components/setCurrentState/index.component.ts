import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { Session } from '@no-module/models/project'
import { map } from 'rxjs/operators'
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
  knowledgeId: number
  // currentState: { knowledgeId: String }, // calculated
  isTouched: boolean
  states: State[]
  template: AlphaTemplate
}

export interface State {
  knowledgeId: string
  status: 'todo' | 'doing' | 'done'
  alphaId: string
}

@Component({
  selector: 'set-current-state',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class SetCurrentStateComponent implements OnInit {
  @Input('alpha')
  set _alpha(arg: AlphaTemplate) {
    this.sessionService.getAlpha(arg).subscribe(alpha => {
      this.alpha = alpha
    })
    this.alphaTemplate = arg
    this.reset()
  }

  alpha: Alpha
  alphaTemplate: AlphaTemplate

  @Input()
  session: Session

  isChecklistVisible = false
  @ViewChild('player')
  public playerContainer: ElementRef
  selectedState: StateTemplate
  projectState = null

  constructor(
    private service: SessionService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {}

  get projectStates() {
    return []
  }
  reset() {
    this.selectedState = null
  }

  onSelectedState(state: StateTemplate) {
    this.selectedState = state
    // this.putDimensionAsTouching()
    // if (this.isPosiblePutStateAsWorking(state)) {
    //   this.service.setStateAsWorking(
    //     this.idSession,
    //     this.alpha.id,
    //     state.info.identifier
    //   )
    // } else {
    //   this.playerContainer.nativeElement.play()
    // }
  }

  registerCheckpoint() {
    this.isChecklistVisible = !this.isChecklistVisible
  }

  startMonitor() {}

  showMonitor() {}
  markStatusAsDone() {
    // selectedState
    // verificar si se puede marcar como hecho
  }

  private isPosiblePutStateAsWorking(state: StateTemplate): Boolean {
    return true // state.isWorking === false && (state.isFirst || state.stateBackIsAchaived)
  }

  private putDimensionAsTouching() {
    // if (this.alpha.isTouched == false) {
    //     this.alpha.isTouched = true;
    // }
  }

  onSelectedCheckpoint(checkpoint: CheckpointTemplate) {
    this.service.setVoteToCheckpoint(
      this.session.id,
      this.alphaTemplate.id,
      this.selectedState.id,
      checkpoint.id,
      true
    )
  }

  noCheck(checkpoint: CheckpointTemplate) {
    this.service.setUnVoteToCheckpoint(
      this.session.id,
      this.alphaTemplate.id,
      this.selectedState.id,
      checkpoint.id,
      false
    )
  }
}

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

export class Alpha {
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

export class State {
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

export interface Checkpoint {
  id: string
  name: string
  description: string
  isVisibleInCard: string
}

export interface ProjectAlpha {
  knowledgeId: number
  // currentState: { knowledgeId: String }, // calculated
  isTouched: boolean
  states: ProjectState[]
  template: Alpha
}

export interface ProjectState {
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
  set _alpha(arg: Alpha) {
    // this.sessionService.getAlpha(arg).subscribe(alpha => {
    //   this.alpha = alpha
    // })
    this.alphaTemplate = arg

    this.reset()
  }

  alpha: ProjectAlpha
  alphaTemplate: Alpha

  @Input()
  session: Session

  projectAlpha: ProjectAlpha = null

  isChecklistVisible = false
  @ViewChild('player')
  public playerContainer: ElementRef
  selectedState: State
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

  onSelectedState(state: State) {
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

  private isPosiblePutStateAsWorking(state: State): Boolean {
    return true // state.isWorking === false && (state.isFirst || state.stateBackIsAchaived)
  }

  private putDimensionAsTouching() {
    // if (this.alpha.isTouched == false) {
    //     this.alpha.isTouched = true;
    // }
  }

  onSelectedCheckpoint(checkpoint: Checkpoint) {
    this.service.setVoteToCheckpoint(
      this.session.id,
      this.alphaTemplate.id,
      this.selectedState.id,
      checkpoint.id,
      true
    )
  }

  noCheck(checkpoint: Checkpoint) {
    this.service.setUnVoteToCheckpoint(
      this.session.id,
      this.alphaTemplate.id,
      this.selectedState.id,
      checkpoint.id,
      false
    )
  }
}

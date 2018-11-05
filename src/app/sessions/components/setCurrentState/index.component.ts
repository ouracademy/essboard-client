import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { Session } from '@no-module/models/project'

import { AlphaProjectService } from '../services/alpha.service'

export interface Alpha {
  id: string
  name: string
  area: string
  states: State[]
}

export interface State {
  id: string
  name: string
  previousId: string
  checkpoints: Checkpoint[]
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

    this.sessionService.getAlpha(arg).subscribe(alpha => {
      this.alpha = alpha
    })
    
    this.kernelService.getStates(arg.id).subscribe((result: any[]) => {
      this.
    })
  }

  @Input()
  session: Session

  alpha: ProjectAlpha

  projectAlpha: ProjectAlpha = null

  registerCheckpointIsVisible = false

  @ViewChild('player')
  public playerContainer: ElementRef
  selectedState: State
  projectState = null

  constructor(
    private service: SessionService,
    public kernelService: KernelService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {}

  get projectStates() {
    return []
  }

  onSelectedState(state: State) {
    this.kernelService
      .getCheckpoints(state.id)
      .subscribe(
        (checkpoints: any[]) => (this.selectedState = { ...state, checkpoints })
      )

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
    this.registerCheckpointIsVisible = !this.registerCheckpointIsVisible
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
      this.alpha.id,
      this.selectedState.id,
      checkpoint.id,
      true
    )
  }

  noCheck(checkpoint: Checkpoint) {
    this.service.setUnVoteToCheckpoint(
      this.session.id,
      this.alpha.id,
      this.selectedState.id,
      checkpoint.id,
      false
    )
  }
}

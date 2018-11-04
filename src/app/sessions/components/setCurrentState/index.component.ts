import { Component, Input, ElementRef, ViewChild } from '@angular/core'
import { SessionService } from '../../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'

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
export class SetCurrentStateComponent {
  @Input()
  alpha: Alpha // kernel
  @Input()
  status: ProjectAlpha // feathers
  @Input()
  idSession: string

  registerCheckpointIsVisible = false

  @ViewChild('player')
  public playerContainer: ElementRef
  selectedState: State

  constructor(
    private service: SessionService,
    public kernelService: KernelService
  ) {}

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

  private isPosiblePutStateAsWorking(state: State): Boolean {
    return true //state.isWorking === false && (state.isFirst || state.stateBackIsAchaived)
  }

  private putDimensionAsTouching() {
    // if (this.alpha.isTouched == false) {
    //     this.alpha.isTouched = true;
    // }
  }

  onSelectedCheckpoint(checkpoint: Checkpoint) {
    this.service.setVoteToCheckpoint(
      this.idSession,
      this.alpha.id,
      this.selectedState.id,
      checkpoint.id,
      true
    )
  }

  noCheck(checkpoint: Checkpoint) {
    this.service.setUnVoteToCheckpoint(
      this.idSession,
      this.alpha.id,
      this.selectedState.id,
      checkpoint.id,
      false
    )
  }
}

import { Component, Input, ElementRef, ViewChild } from '@angular/core'
import { State, Checkpoint } from '@no-module/models/project-kernel'
import { SessionService } from '../../services/session.service'

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

  @ViewChild('player')
  public playerContainer: ElementRef
  selectedState: State

  constructor(private service: SessionService) {}

  get projectStates() {
    return []
  }

  onSelectedState(state: State) {
    this.selectedState = state

    this.putDimensionAsTouching()
    if (this.isPosiblePutStateAsWorking(state)) {
      this.service.setStateAsWorking(
        this.idSession,
        this.alpha.id,
        state.info.identifier
      )
    } else {
      this.playerContainer.nativeElement.play()
    }
  }

  private isPosiblePutStateAsWorking(state: State): Boolean {
    return (
      state.isWorking === false && (state.isFirst || state.stateBackIsAchaived)
    )
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
      this.selectedState.info.identifier,
      checkpoint.info.identifier,
      !checkpoint.isAchieved
    )
  }
  noCheck(checkpoint: Checkpoint) {
    this.service.setUnVoteToCheckpoint(
      this.idSession,
      this.alpha.id,
      this.selectedState.info.identifier,
      checkpoint.info.identifier,
      !checkpoint.isAchieved
    )
  }
}

import { Component, OnInit, Input, EventEmitter, ElementRef, Output, ViewChild } from '@angular/core';
import { Alpha, State, Checkpoint } from '@no-module/models/project-kernel';
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'set-current-state',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css']
})
export class SetCurrentStateComponent implements OnInit {
    @ViewChild('player') public playerContainer: ElementRef;

    @Input()
    knowledge: any;
    @Input()
    implementation: any;

    @Input()
    idSession: string;

    selectedState: State;
    constructor(private service: SessionService) {
    }
    ngOnInit() {
    }
    onSelectedState(state: State) {
        this.putDimensionAsTouching();
        this.selectedState = state;
        console.log(state);
        if (this.isPosiblePutStateAsWorking(state)) {
            this.service.setStateAsWorking(this.idSession, this.knowledge.id, state.info.identifier);
        } else {
            this.playerContainer.nativeElement.play();

        }
    }
    private isPosiblePutStateAsWorking(state: State): Boolean {
        return state.isWorking === false && (state.isFirst || state.stateBackIsAchaived);
    }
    private putDimensionAsTouching() {
        // if (this.alpha.isTouched == false) {
        //     this.alpha.isTouched = true;
        // }
    }
    onSelectedCheckpoint(checkpoint: Checkpoint) {
        this.service.setVoteToCheckpoint(this.idSession,
            this.knowledge.id,
            this.selectedState.info.identifier,
            checkpoint.info.identifier, !checkpoint.isAchieved);
    }
    noCheck(checkpoint: Checkpoint) {
        this.service.setUnVoteToCheckpoint(this.idSession,
            this.knowledge.metadatidaId,
            this.selectedState.info.identifier,
            checkpoint.info.identifier, !checkpoint.isAchieved);
    }


}
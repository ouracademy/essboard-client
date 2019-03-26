import { Component, OnInit } from '@angular/core'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from '../detail-alpha/kernel'
import { EvaluationService } from 'app/sessions/services/evaluation.service'
import { SharedService } from '@core/shared.service'
import { SessionService } from 'app/sessions/services/session.service'
import { combineLatest } from 'rxjs'
import { EvaluationComponent } from '../evaluation/index.component'
import { MatDialogRef, MatDialog } from '@angular/material'

@Component({
  selector: 'set-state',
  templateUrl: 'index.component.html',
  styles: [
    `
      .left-bottom {
        top: auto !important;
        right: auto !important;
        bottom: 25px !important;
        position: fixed !important;
      }
    `
  ]
})
export class SetStateComponent implements OnInit {
  alphas: AlphaTemplate[]
  isEvaluating = false
  canEvaluate: boolean
  ref: MatDialogRef<EvaluationComponent>

  constructor(
    public kernelService: KernelService,
    public sharedService: SharedService,
    public evaluations: EvaluationService,
    public sessionService: SessionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    combineLatest(
      this.sessionService.currentMembers$,
      this.sessionService.currentSession$
    ).subscribe(([members, session]) => {
      this.canEvaluate = members.length > 1 && !session.hasFinished
    })

    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })

    this.evaluations.getEvalutionStatus().subscribe(status => {
      const content = status.isEvaluating
        ? {
            type: 'info',
            message: 'Estas en plena evaluación'
          }
        : null
      this.sharedService.showToast(content)
      this.isEvaluating = status.isEvaluating
    })
  }

  startEvaluation() {
    this.ref = this.dialog.open(EvaluationComponent, {
      height: '360px',
      width: '300px',
      maxWidth: '82vw'
    })
  }

  stopEvaluation() {
    this.evaluations.stop()
  }
}



import { Component, OnInit, AfterContentChecked, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Session } from '@no-module/models/project';
import { Alpha, State, Checkpoint } from '@shared/kernel/model/kernel';
import { SessionService } from '../services/session.service';
import { AuthService } from '@core/auth.service';
import { PrimaryKernelMockService } from '@shared/kernel/services/index';
import { AlphaMetadata, StateMetadata } from '@no-module/models/kernel/kernel';
import { BagGoal } from '@no-module/models/goal';
import { KernelService } from '@core/kernel-knowledge.service';



@Component({
  selector: 'session',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
})
export class SessionComponent implements OnInit {
  idSession: string;
  session: Session;

  currentAlpha: any;
  statusByCurrentAlpha = null
  isJoinedToChat: boolean = false;
  workItems: any[] = [];
  private subscription: Subscription;

  alphas = []
  constructor(
    private kernelService: KernelService,
    private service: SessionService,
    public kernel: PrimaryKernelMockService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {
    this.currentAlpha = null;
  }
  ngOnInit() {
    this.subscription = this.service.currentSession$.subscribe((session: Session) => {
      this.session = session;
      //put init work session in method colaborate
    });
    this.subscription = this.route.params.subscribe(params => {
      this.idSession = params['id'];
      this.service.getSession(this.idSession);
    });

    this.kernelService.getAlphas().subscribe((result: any[]) => {
      this.alphas = result
    })
  }


  private colaborate(sessionId, projectId) {
    this.service.colaboreUsingUserIdInProject(sessionId, projectId);
    this.service.colaboreUsingSessionsIdInUser(sessionId);
  }

  handleSelectionAlpha(alpha: any) {
    this.currentAlpha = alpha;
    this.kernelService.getStates(alpha['id']).subscribe((result: any[]) => {
      this.currentAlpha['states'] = result
    })

  }
  getWorkItems(workItem) {
    this.workItems.push(workItem);
  }
  delete() {

  }
  showChat() {
    this.isJoinedToChat = !this.isJoinedToChat;
  }
  goToProject() {
    this.router.navigate(['/me/projects', this.session.projectId]);
  }

}
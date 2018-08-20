

import { Component, OnInit, AfterContentChecked, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Session } from '../../../shared/models/project';
import { Alpha, State, Checkpoint } from '../../../shared/modules/kernel/model/kernel';
import { SessionService } from '../services/session.service';
import { AuthService } from '../../../auth.service';
import { PrimaryKernelMockService } from '../../../shared/modules/kernel/services/index';
import { AlphaMetadata, StateMetadata } from '../../../shared/models/kernel/kernel';
import { BagGoal } from '../../../shared/models/goal';


@Component({
  selector: 'session',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
})
export class SessionComponent implements OnInit{
  idSession: string;
  session: Session;
  alphaSelect: AlphaMetadata;
  isJoinedToChat: boolean = false;
  workItems: any[] = [];
  private subscription: Subscription;
  constructor(
    private service: SessionService,
    public kernel: PrimaryKernelMockService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) {
    this.alphaSelect = null;
  }
  ngOnInit() {
    this.subscription = this.service.currentSession.subscribe((session: Session) => {
      this.session = session;
      //put init work session in method colaborate
    });
    this.subscription = this.route.params.subscribe(params => {
      this.idSession = this.route.snapshot.params['id'];
      this.service.getSession(this.idSession);
    });
  }
  private colaborate(sessionId, projectId) {
    this.service.colaboreUsingUserIdInProject(sessionId, projectId);
    this.service.colaboreUsingSessionsIdInUser(sessionId);
  }

  chooseAlpha(alpha: AlphaMetadata) {
    this.alphaSelect = alpha;
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
import {
  Component,
  OnInit,
  AfterContentChecked,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Session } from '@no-module/models/project'
import { SessionService } from '../services/session.service'
import { AuthService } from '@core/auth.service'
import { PrimaryKernelMockService } from '@shared/kernel/services/index'
import { KernelService } from '@core/kernel-knowledge.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'session',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class SessionComponent implements OnInit {
  idSession: string
  session: Session

  currentAlpha: any
  statusByCurrentAlpha = null

  isChatVisible: boolean = false

  workItems: any[] = []

  constructor(
    public kernelService: KernelService,
    private service: SessionService,
    public kernel: PrimaryKernelMockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentAlpha = null
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idSession = params['id']
      this.service.getSession(this.idSession)
    })

    this.service.currentSession$.subscribe((session: Session) => {
      this.session = session
    })
  }

  handleSelectionAlpha(alpha: any) {
    this.currentAlpha = alpha
    this.kernelService.getStates(alpha['id']).subscribe((result: any[]) => {
      this.currentAlpha['states'] = result
    })
  }

  finishSession() {
    this.service.finish(this.session)
  }

  delete() {}

  goToProject() {
    this.router.navigate(['/me/projects', this.session.projectId])
  }

  private colaborate(sessionId, projectId) {
    this.service.colaboreUsingUserIdInProject(sessionId, projectId)
    this.service.colaboreUsingSessionsIdInUser(sessionId)
  }
  getWorkItems(workItem) {
    this.workItems.push(workItem)
  }
}

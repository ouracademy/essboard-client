import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from '../services/session.service'
import { PrimaryKernelMockService } from '@shared/kernel/services/index'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaProjectService } from '../services/alpha.service'

@Component({
  selector: 'session',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class SessionComponent implements OnInit {
  idSession: string
  session: Session

  alphas: any[]
  currentAlpha: any

  projectAlpha = null

  isChatVisible = false

  workItems: any[] = []

  constructor(
    public kernelService: KernelService,
    private service: SessionService,
    public kernel: PrimaryKernelMockService,
    private route: ActivatedRoute,
    private router: Router,
    private alphaService: AlphaProjectService
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

    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })

    this.alphaService.alphaProject$.subscribe(
      projectAlpha => (this.projectAlpha = projectAlpha)
    )
  }

  handleSelectionAlpha(alpha: any) {
    this.currentAlpha = alpha
    this.kernelService.getStates(alpha['id']).subscribe((result: any[]) => {
      this.currentAlpha['states'] = result
    })

    this.alphaService.getProjectAlpha(this.session.id, alpha['id'])
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

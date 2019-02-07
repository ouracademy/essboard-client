import { Component, OnInit, HostListener, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from '../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from './detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'

@Component({
  selector: 'session',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class SessionComponent implements OnInit, CanLeaveChannel, OnDestroy {
  idSession: string
  session: Session

  alphas: AlphaTemplate[]
  selectedAlpha: AlphaTemplate = null

  isChatVisible = false
  isSideNavOpen = true

  workItems: any[] = []

  events = [
    {
      user: 'qpdian',
      text: 'a movido The system Y de TODO a DOING',
      createdAt: new Date()
    }
  ]

  constructor(
    public kernelService: KernelService,
    private service: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.selectedSession = params['id']
    })

    this.service.currentSession$.subscribe(session => (this.session = session))

    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander($event) {
    const confirmationMessage = 'o/'
    $event.returnValue = confirmationMessage
    return confirmationMessage
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.leaveChannel()
  }

  leaveChannel() {
    return this.service.leaveChannel()
  }

  handleSelectionAlpha(alpha: any) {
    this.selectedAlpha = alpha
  }

  finishSession() {
    this.service.finish()
  }

  delete() {}

  goToProject() {
    this.router.navigate(['/me/projects', this.session.projectId])
  }

  getWorkItems(workItem) {
    this.workItems.push(workItem)
  }
  ngOnDestroy() {
    console.log('on destory')
  }
}

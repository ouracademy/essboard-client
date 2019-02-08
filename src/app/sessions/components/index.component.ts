import { Component, OnInit, HostListener, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from '../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from './detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'
import { SharedService } from '@core/shared.service'
import { EventsService } from '../services/events.service'
import { flatMap } from 'rxjs/operators'

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
  isOnline = true

  workItems: any[] = []
  sessionEvents: any

  constructor(
    public kernelService: KernelService,
    private sessions: SessionService,
    private events: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessions.selectedSession = params['id']
    })

    this.sessions.currentSession$.subscribe(session => {
      this.session = session
    })

    this.sessions.currentSession$
      .pipe(flatMap(session => this.events.of(session)))
      .subscribe(sessionEvents => {
        this.sessionEvents = sessionEvents
      })

    this.kernelService.getAlphas().subscribe(alphas => {
      this.alphas = alphas
    })

    this.sharedService.networkStatus.subscribe(
      status => (this.isOnline = status)
    )
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
    return this.sessions.leaveChannel()
  }

  handleSelectionAlpha(alpha: any) {
    this.selectedAlpha = alpha
  }

  finishSession() {
    this.sessions.finish()
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

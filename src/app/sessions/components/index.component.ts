import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { MediaChange, MediaObserver } from '@angular/flex-layout'
import { MatDialogRef } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { KernelService } from '@core/kernel-knowledge.service'
import { SharedService } from '@core/shared.service'
import { Session } from '@models/project'
import { TimeagoIntl } from 'ngx-timeago'
import { strings as spanishStrings } from 'ngx-timeago/language-strings/es'
import { flatMap } from 'rxjs/operators'
import { Subscription } from 'rxjs/Subscription'
import { EventsService } from '../services/events.service'
import { CanLeaveChannel } from '../services/leave-session.guard'
import { SessionService } from '../services/session.service'
import { ChatComponent } from './chat/index.component'
import { AlphaTemplate } from './detail-alpha/kernel'

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

  isSideNavOpen = true
  isOnline = true

  refDialog: MatDialogRef<ChatComponent> = null

  workItems: any[] = []
  sessionEvents: any
  configByViewport
  watcher: Subscription

  constructor(
    public kernelService: KernelService,
    private sessions: SessionService,
    private events: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    public mediaObserver: MediaObserver,
    timeAgoIntl: TimeagoIntl
  ) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.configByViewport =
        change.mqAlias === 'xs'
          ? { width: '85vw', mode: 'over', isChatVisible: false }
          : { width: '370px', mode: 'side', isChatVisible: true }
    })

    timeAgoIntl.strings = spanishStrings
    timeAgoIntl.changes.next()
  }

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
  ngOnDestroy() {}

  toggleChat() {
    this.configByViewport.isChatVisible = !this.configByViewport.isChatVisible
  }
  closeChat() {
    this.configByViewport.isChatVisible = false
  }
}

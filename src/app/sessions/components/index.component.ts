import { Component, OnInit, HostListener, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Session } from '@no-module/models/project'
import { SessionService } from '../services/session.service'
import { KernelService } from '@core/kernel-knowledge.service'
import { AlphaTemplate } from './detail-alpha/kernel'
import { CanLeaveChannel } from '../services/leave-session.guard'
import { SharedService } from '@core/shared.service'
import { EventsService } from '../services/events.service'
import { flatMap, first } from 'rxjs/operators'
import { MatDialog, MatDialogRef } from '@angular/material'
import { ChatComponent } from './chat/index.component'

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

  isChatVisible = true
  isSideNavOpen = true
  isOnline = true

  refDialog: MatDialogRef<ChatComponent> = null

  workItems: any[] = []
  sessionEvents: any

  constructor(
    public kernelService: KernelService,
    private sessions: SessionService,
    private events: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessions.selectedSession = params['id']
    })

    this.sessions.currentSession$.subscribe(session => {
      this.session = session
    })

    this.sessions.currentSession$
      .pipe(first())
      .subscribe(session => this.openChat(session['id']))

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

    this.sessions.statusChat$.subscribe(status => {
      switch (status) {
        case 'close':
          this.isChatVisible = false
          this.closeChat()
          break
        case 'openWithModal':
          if (this.isChatVisible) {
            this.closeChat()
            this.openChat()
          }
          break
        case 'toggle':
          this.toggleChat()
          break
      }
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
    this.closeChat()
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible

    if (this.isChatVisible) {
      this.openChat()
    } else {
      this.closeChat()
    }
  }

  openChat(sessionId = null) {
    this.refDialog = this.dialog.open(ChatComponent, {
      width: '300px',
      height: '400px',
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'paddingless',
      position: { bottom: '0', right: '0' },
      data: {
        sessionId: sessionId || this.session.id,
        isReadonly: this.session.hasFinished || !this.isOnline
      }
    })
  }
  closeChat() {
    if (this.refDialog) {
      this.refDialog.close()
    }
  }
}

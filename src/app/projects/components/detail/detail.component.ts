import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { MatDialog, MatDialogRef } from '@angular/material'

import { Project, Session } from '@no-module/models/project'
import { ProjectService } from '../../services/project.service'
import { SharedService } from '@core/shared.service'
import { ShareComponent } from '../share/share.component'

@Component({
  selector: 'project-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  project: Project
  sessions: any[] = []
  selectedSession: Session
  private subscription: Subscription
  private subscription2: Subscription

  constructor(
    private route: ActivatedRoute,
    private service: ProjectService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription = this.service.currentProject$.subscribe(
      (item: Project) => {
        this.project = item
      }
    )

    this.subscription2 = this.route.params.subscribe(params => {
      this.service.getProject(params['id'])
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
  }

  addSession() {
    if (this.project.canCreateNewSession()) {
      this.service.addSession()
    } else {
      this.sharedService.showError(
        'Upps!',
        'Aun no haz concluido tu actual sesión'
      )
    }
  }

  share() {
    this.dialog.open(ShareComponent, { data: this.project })
  }

  delete() {
    this.service.delete()
  }

  setName(name: string) {
    if (name) {
      this.service.setName(name)
    }
  }

  setDescription(description: string) {
    if (description) {
      this.service.setDescription(description)
    }
  }
}

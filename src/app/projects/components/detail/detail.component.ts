import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'

import { Project, Session } from '@no-module/models/project'
import { ProjectService } from '../../services/project.service'
import { SharedService } from '@core/shared.service'
import { ShareComponent } from '../share/share.component'
import { SessionService } from 'app/sessions/services/session.service'
import { LoadingClickService } from '@shared/loading-when-clicked'

/*
   <mat-form-field appearance="outline">
      <input
        matInput
        placeholder="Nombre del proyecto"
        maxlength="200"
        [(ngModel)]="project.name"
        #name
        (keyup.enter)="setName(name.value)"
        (blur)="setName(name.value)"
      />
    </mat-form-field>
    <mat-form-field appearance="outline"
      ><input
        matInput
        placeholder="Descripcion del proyecto"
        maxlength="350"
        [(ngModel)]="project.description"
        #description
        (keyup.enter)="setDescription(description.value)"
        (blur)="setDescription(description.value)"
      />
    </mat-form-field>
*/
@Component({
  selector: 'project-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {
  project: Project
  sessions: any[] = []
  selectedSession: Session

  constructor(
    private loading: LoadingClickService,
    private route: ActivatedRoute,
    private service: ProjectService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.service.currentProject$.subscribe((item: Project) => {
      this.project = item
    })

    this.route.params.subscribe(params => {
      this.service.selectedProject = params['id']
    })
  }

  addSession() {
    this.sessionService.addSession(this.project.id).catch(error => {
      this.loading.stopLoading('addSession')
      this.sharedService.showError(
        'Upps!',
        'Aun no haz concluido tu actual sesión'
      )
    })
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

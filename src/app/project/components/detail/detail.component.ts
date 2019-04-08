import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Observable } from 'rxjs/Observable'

import { Project, Session } from '@models/project'
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
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
      }
    `
  ]
})
export class ProjectDetailComponent implements OnInit {
  project$: Observable<Project>
  sessions: any[] = []
  selectedSession: Session
  optionsRender = {
    message:
      'Tu proyecto aun no tiene sesiones, empieza creando uno haciendo click',
    image: 'assets/images/meeting.png',
    addButton: { message: 'Aquí' }
  }

  constructor(
    private loading: LoadingClickService,
    private service: ProjectService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.project$ = this.service.currentProject$
  }

  addSession(project) {
    this.sessionService
      .addSession(project.id)
      .then(() => this.loading.stopLoading('addSession'))
      .catch(error => {
        this.loading.stopLoading('addSession')
        this.sharedService.showError(
          'Upps!',
          'Aun no haz concluido tu actual sesión'
        )
      })
  }

  share(project) {
    this.dialog.open(ShareComponent, { data: project, minWidth: '50vw' })
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

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SharedService } from '@core/shared.service'
import { Project, Session } from '@models/project'
import { LoadingClickService } from '@shared/loading-when-clicked'
import { SessionService } from 'app/sessions/services/session.service'
import { Observable } from 'rxjs/Observable'
import { ProjectService } from '../../services/project.service'

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
    message: 'Create a session, to know how is the project being',
    image: 'assets/images/meeting.png',
    addButton: { message: 'Click here' }
  }

  constructor(
    private loading: LoadingClickService,
    private service: ProjectService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.project$ = this.service.currentProject$
  }

  addSession(project) {
    this.sessionService
      .addSession(project.id)
      .then(session => {
        this.loading.stopLoading('addSession')
        this.router.navigate(['sessions', session._id], {
          relativeTo: this.currentRoute
        })
      })
      .catch(error => {
        this.loading.stopLoading('addSession')
        this.sharedService.showError(
          'Oops!',
          'You have not finished your current session'
        )
      })
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

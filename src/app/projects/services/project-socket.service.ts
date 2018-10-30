import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Subject'
import { ProjectService } from './project.service'
import { SocketService } from '@core/socket.service'
import { Project, Session } from '@no-module/models/project'
import { ToProject } from '@no-module/transforms/to-project'
import { BuildDataToServer } from '@no-module/util/build-data-to-server'
import { SessionService } from '../../sessions/services/session.service'

@Injectable()
export class ProjectSocketService extends ProjectService {
  currentProject$: Subject<any>
  project: Project
  service: any
  otherService: any

  constructor(
    public socketService: SocketService,
    private router: Router,
    private sessionService: SessionService
  ) {
    super()
    this.service = this.socketService.getService('projects')
    this.service.on('removed', removedItem => this.onRemoved(removedItem))
    this.service.on('patched', patchedItem => this.onPatched(patchedItem))
    this.currentProject$ = new Subject<any>()
    this.project = null
  }
  getProject(id: string) {
    this.service.get(id).then(item => {
      this.project = this.toProject(item)
      this.currentProject$.next(this.project)
    })
  }

  private toProject(item: any) {
    return new Project(
      item._id,
      item.name,
      item.description,
      item.createdBy,
      item.createdAt
    )
  }

  delete() {
    this.service.remove(this.project.id, {}, (err, result: any) => {
      if (err) return console.error(err)
      // this.projects.splice(this.getIndex(id), 1);
      // this.projectsObserver.next(this.projects);
      this.router.navigate(['me/projects'])
    })
  }
  patchData(data) {
    this.service
      .patch(this.project.id, data)
      .then(result => {
        console.log('se edito ')
      })
      .catch(function(error) {})
  }

  setName(name) {
    const data = { name: name }
    this.patchData(data)
  }
  setDescription(description) {
    const data = { description: description }
    this.patchData(data)
  }

  inviteTo(project, user) {
    this.socketService
      .getService('members')
      .create({ projectId: project.id, userId: user.id, role: 'invited' })
      .subscribe(
        result => {},
        error => {
          console.log(error, 'Error al editar  tu proyecto')
          //TODO: show alert
        }
      )
  }

  desinviteTo(user) {
    this.service
      .watch()
      .patch(
        this.project.id,
        { $pull: { members: user.id } },
        { query: { data: user.id } }
      )
      .subscribe(
        result => {
          alert('Invitado al proyecto')
        },
        function(error) {
          console.log(error, 'Error al editar  tu proyecto')
        }
      )
  }

  private onPatched(project: any) {
    this.project = this.toProject(project)
  }

  private onRemoved(removedItem) {
    //  const index = this.getIndex(removedItem.id);
    //this.dataStore.checks.splice(index, 1);
    //this.itemsObserver.next(this.data);
  }

  addSession() {
    this.sessionService.addSession(
      this.project.id,
      this.project.getLastSessionId()
    )
  }
}

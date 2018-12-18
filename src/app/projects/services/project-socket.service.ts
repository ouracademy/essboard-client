import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ProjectService } from './project.service'
import { SocketService } from '@core/socket.service'
import { Project } from '@no-module/models/project'
import { Member, MembersService } from 'app/members/members.service'
import { BehaviorSubject, of } from 'rxjs'
import { ChannelService } from 'app/sessions/services/channel.service'
import { User } from 'app/users/model/user'

@Injectable()
export class ProjectSocketService extends ProjectService {
  currentProject$: BehaviorSubject<any>
  project: Project
  service: any

  constructor(
    public socketService: SocketService,
    private membersService: MembersService,
    private channels: ChannelService,
    private router: Router
  ) {
    super()
    this.service = this.socketService.getService('projects')
    this.service.on('removed', removedItem => this.onRemoved(removedItem))
    this.service.on('patched', patchedItem => this.onPatched(patchedItem))
    this.currentProject$ = new BehaviorSubject<any>(null)
    this.members$ = of([])
    this.project = null
  }

  set selectedProject(projectId: string) {
    this.service.get(projectId).then(project => {
      this.channels.join('projects', project['_id'])
      this.project = this.toProject(project)
      this.currentProject$.next(this.project)
      this.members$ = this.membersService.until(projectId)
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
    this.service.patch(this.project.id, data)
  }

  setName(name) {
    const data = { name: name }
    this.patchData(data)
  }

  setDescription(description) {
    const data = { description: description }
    this.patchData(data)
  }

  private onPatched(project: any) {
    this.project = this.toProject(project)
  }

  private onRemoved(removedItem) {
    //  const index = this.getIndex(removedItem.id);
    //this.dataStore.checks.splice(index, 1);
    //this.itemsObserver.next(this.data);
  }

  invite(aUser: User): Promise<any> {
    return this.membersService.invite(aUser, this.project.id)
  }

  remove(aMember: Member): Promise<any> {
    return this.membersService.remove(aMember, this.project.id)
  }
}

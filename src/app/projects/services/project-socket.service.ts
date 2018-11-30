import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Subject'
import { ProjectService } from './project.service'
import { SocketService } from '@core/socket.service'
import { Project } from '@no-module/models/project'
import { Member, MembersService } from 'app/members/members.service'
import { flatMap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class ProjectSocketService extends ProjectService {
  currentProject$: Subject<any>
  project: Project
  service: any

  constructor(
    public socketService: SocketService,
    private membersService: MembersService,
    private router: Router
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

  invite(aUser: any): Promise<any> {
    return this.membersService.invite(aUser, this.project.id)
  }

  remove(aMember: Member): Promise<any> {
    return this.membersService.remove(aMember, this.project.id)
  }

  get projectMembers$(): Observable<Member[]> {
    return this.currentProject$.pipe(
      flatMap(project => this.membersService.find(project.id))
    )
  }
}

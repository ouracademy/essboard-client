import { Injectable } from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { SocketService } from '@core/socket.service'

export interface Member {
  id: string
  name: string
  email: string
}

@Injectable()
export class MembersService {
  projectMembers: any[] = []
  projectMembers$ = new Subject<any>()
  service: any

  constructor(socketService: SocketService) {
    this.service = socketService.getService('members')
  }

  set selectedProject(projectId: string) {
    this.service
      .find({ query: { projectId } })
      .then(members => this.projectMembers$.next(members))
  }

  until(projectId: string, date?: Date): Observable<Member[]> {
    return this.service
      .watch({ listStrategy: 'always' })
      .find({ query: { projectId, date } })
  }

  invite(aUser, projectId) {
    return this.service.create({
      type: 'MEMBER_INVITED',
      projectId,
      userId: aUser.id,
      role: 'collaborator'
    })
  }

  remove(aMember: Member, projectId) {
    return this.service.create({
      type: 'MEMBER_REMOVED',
      projectId,
      userId: aMember.id
    })
  }
}

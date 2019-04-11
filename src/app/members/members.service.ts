import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
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
  memberInvitationsService: any

  constructor(socketService: SocketService) {
    this.service = socketService.getService('members')
    this.memberInvitationsService = socketService.getService(
      'member-invitations'
    )
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

  invite(email: string, projectId) {
    return this.memberInvitationsService.create({
      projectId,
      to: email,
      role: 'collaborator'
    })
  }

  remove(aMember: Member, projectId) {
    return this.service.remove({
      projectId,
      to: aMember.id
    })
  }
}

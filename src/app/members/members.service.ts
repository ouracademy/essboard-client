import { Injectable } from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { SocketService } from '@core/socket.service'

export interface Member {
  id: string
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

  getMembers(id) {
    this.service
      .find({ query: { projectId: id, withUserPopulate: true } })
      .then((result: any[]) => {
        this.projectMembers = result
        this.projectMembers$.next(this.projectMembers)
      })
  }

  find(projectId, date?: Date) {
    return of<Member[]>(this.service.find({ query: { projectId, date: date } }))
  }

  getInfoMembers(userIds) {
    return this.projectMembers.length > 0
      ? userIds.map(userId => {
          const memberTemp = this.projectMembers.find(
            member => member['userId']['_id'] === userId
          )
          return memberTemp['userId']
        })
      : []
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
      type: 'REMOVE_MEMBER',
      projectId,
      userId: aMember.id
    })
  }
}

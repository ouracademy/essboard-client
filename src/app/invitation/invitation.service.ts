import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'

export interface Invitation {
  id: string
  is: 'accepted' | 'pending' | 'cancelled'
  from: { name: string }
  to: { id: string; email: string }
  project: { id: string; name: string }
}

@Injectable()
export class InvitationsService {
  service: any
  constructor(socketService: SocketService) {
    this.service = socketService.getService<Invitation>('member-invitations')
  }

  accept(invitationId: string) {
    return this.service.patch(invitationId, { accept: true })
  }

  get(id: string): Promise<Invitation> {
    return this.service.get(id)
  }

  remove(id: string) {
    return this.service.remove(id)
  }
}

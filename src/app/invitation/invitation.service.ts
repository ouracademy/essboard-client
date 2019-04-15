import { Injectable } from '@angular/core';
import { SocketService } from '@core/socket.service';
import { Service } from '@feathersjs/feathers';

export interface Invitation {
  id: string
  is: 'accepted' | 'pending' | 'cancelled'
  from: { name: string }
  to: { id: string; email: string }
  project: { id: string; name: string }
}

@Injectable()
export class InvitationsService {
  service: Service<Invitation>
  constructor(socketService: SocketService) {
    this.service = socketService.getService<Invitation>('member-invitations')
  }

  get(id: string): Promise<Invitation> {

    return this.service.get(id)
  }

  remove(id: string) {

    return this.service.remove(id)
  }
}

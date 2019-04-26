import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { User } from '@models/user'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators/map'

@Injectable()
export class UserSearchSocketService {
  service: any

  constructor(public socketService: SocketService) {
    this.service = this.socketService.getService('users')
  }

  private toUser(source) {
    return new User(source._id, source.name, source.email, source.createdAt)
  }

  search(email: string): Observable<User[]> {
    const term = email.trim()

    return term
      ? this.service
          .watch()
          .find({
            query: {
              email: { $regex: term, $options: 'igm' }
            }
          })
          .pipe(
            map((items: any[]) => {
              return items.map(x => this.toUser(x))
            })
          )
      : of([])
  }
}

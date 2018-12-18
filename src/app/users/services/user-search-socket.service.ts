import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators/map'
import { User } from '../model/user'
import { SocketService } from '@core/socket.service'
import { Observable, of } from 'rxjs'

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
            map(items => {
              return items['data'].map(x => this.toUser(x))
            })
          )
      : of([])
  }
}

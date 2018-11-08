import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { UserService } from './user.service'
import { User } from '../model/user'
import { SocketService } from '@core/socket.service'

@Injectable()
export class UserSocketService extends UserService {
  user: User
  users: User[]
  service: any

  constructor(public socketService: SocketService, private router: Router) {
    super()

    this.service = this.socketService.getService('users')

    this.users$ = new Subject<any>()
    this.currentUser$ = new Subject<any>()

    this.user = null
    this.users = []
  }

  getUsers() {
    this.service.find(
      {
        query: {
          $sort: { createdAt: -1 }
        }
      },
      (err, items: any) => {
        if (err) return console.error(err)
        this.users = items.data.map(x => this.toUser(x))
        this.users$.next(this.users)
      }
    )
  }

  get(id: string) {
    this.service.get(id, (err, x: any) => {
      if (err) return console.error(err)
      this.user = new User(x._id, x.username, x.email, x.createdAt)
      this.currentUser$.next(this.user)
    })
  }

  getByUsername(username: string) {
    this.service.find(
      {
        query: {
          name: username,
          $limit: 1
        }
      },
      (err, item: any) => {
        if (err) return console.error('error', err)
        this.user = this.toUser(item.data[0])
        this.currentUser$.next(this.user)
      }
    )
  }

  delete(id: number | number) {
    this.users.splice(id, 1)
    this.users$.next(this.users)
    this.service.remove(id).subscribe(
      result => {
        this.router.navigate(['admin/users'])
      },
      error => {
        alert('Error al eliminar  tu proyecto')
      }
    )
  }

  patch(user: User) {
    this.service.patch(user.id, {
      name: user.name,
      email: user.email
    })
  }
  setAppKeyTrello(user: User) {
    this.service.patch(user.id, {
      appKeyTrello: user.appKeyTrello
    })
  }

  private toUser(source) {
    return new User(source._id, source.name, source.email, source.createdAt)
  }

  search(email: string) {
    this.service.find(
      {
        query: {
          email: { $regex: email, $options: 'igm' }
        }
      },
      (err, items: any) => {
        if (err) {
          return console.error('error', err)
        }
        this.users = items.data.map(x => this.toUser(x))
        this.users$.next(this.users)
      }
    )
  }
}

import { Subject } from 'rxjs'

export abstract class UserService {
  users$: Subject<any>
  currentUser$: Subject<any>
  abstract getUsers()
  abstract get(id: number | string)
  abstract delete(id: number | string)
  abstract getByUsername(username: string)
  abstract patch(data)
  abstract setAppKeyTrello(data)
}

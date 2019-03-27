import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { Credentials, User } from '@models/user'

@Injectable()
export class AuthService {
  // store the URL so we can redirect after logging in
  private _redirectURL: string

  constructor(public socketService: SocketService) {}

  set redirectURL(URL: string) {
    this._redirectURL = URL
  }

  get redirectURL() {
    return this._redirectURL ? this._redirectURL : '/me/projects'
  }

  public login(credentials?: Credentials): Promise<User> {
    if (credentials) {
      return this.socketService.authenticate({
        strategy: 'local',
        email: credentials.email,
        password: credentials.password
      })
    } else {
      return this.socketService.authenticate()
    }
  }

  public get isLoggedIn(): boolean {
    return !!this.user
  }

  public logout(): Promise<void> {
    return this.socketService.logout()
  }

  public get user(): User {
    const data = this.socketService.getItem('user')
    return data
      ? new User(
          data['_id'],
          data['name'],
          data['email'],
          data['createdAt'],
          data['appKeyTrello']
        )
      : null
  }

  signup(user: User) {
    return this.socketService
      .getService('users')
      .create({
        name: user.name,
        email: user.email,
        password: user.password
      })
      .then(val => this.login(new Credentials(user.email, user.password)))
  }
}

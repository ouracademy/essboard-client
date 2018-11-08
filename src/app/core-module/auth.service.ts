import { Injectable } from '@angular/core'
import { SocketService } from '@core/socket.service'
import { Credentials, User } from '@no-module/models/user'
import { tap } from 'rxjs/operators'

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

  public login(credentials: Credentials): Promise<User> {
    return this.socketService.authenticate({
      strategy: 'local',
      email: credentials.email,
      password: credentials.password
    })
  }

  public reconnect() {
    const token = window.localStorage.getItem('feathers-jwt')
    if (token) {
      this.socketService
        .logout()
        .then(() => {
          this.socketService.authenticate({ type: 'token', token: token })
        })
        .catch(err => console.log('err', err))
    }
  }

  public get isLoggedIn(): boolean {
    return !!this.user
  }

  public logout(): Promise<void> {
    return this.socketService.logout()
  }

  public get user(): User {
    const data = this.socketService.getValue('user')
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
  public set user(user: User) {
    window.localStorage['user'] = JSON.stringify(user)
  }
  haveThisSession(sessionId: string): boolean {
    const data = JSON.parse(window.localStorage.getItem('user'))
    return data.sessionsId.indexOf(sessionId) !== -1
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

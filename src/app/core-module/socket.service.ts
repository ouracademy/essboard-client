import { Injectable } from '@angular/core'
import { api } from '@env/environment'

import feathers, { Application, Service } from '@feathersjs/feathers'
import * as io from 'socket.io-client'
import * as feathersRx from 'feathers-reactive'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
@Injectable()
export class SocketService {
  public _socket: any
  public _app: Application
  public _url: string
  constructor() {
    this._url = api
    this.init()
  }

  init() {
    this._socket = io(this._url)
    this._app = feathers()
      .configure(socketio(this._socket, { timeout: 20000 }))
      .configure(
        auth({
          storage: window.localStorage
        })
      )
      .configure(
        feathersRx({
          idField: '_id'
        })
      )
  }

  // expose services
  public getService<T>(name: string): Service<T> {
    return this._app.service(name)
  }

  public getValue(key) {
    return this._app.get(key)
  }
  public authenticate(credentials?): Promise<any> {
    return this._app
      .authenticate(credentials)
      .then(result => this._app.passport.verifyJWT(result.accessToken))
      .then(payload => this.getService('users').get(payload.userId))
      .then(user => this._app.set('user', user))
  }

  public logout() {
    return this._app.logout().then(() => {
      this._app.set('user', null)
    })
  }
}

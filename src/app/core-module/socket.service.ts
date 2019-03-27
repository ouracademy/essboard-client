import { Injectable } from '@angular/core'
import { coreApi } from '@env/environment'

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
    this._url = coreApi
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

  public getService<T>(name: string): Service<T> {
    return this._app.service(name)
  }

  public authenticate(credentials?): Promise<any> {
    return this._app
      .authenticate(credentials)
      .then(result => this._app.passport.verifyJWT(result.accessToken))
      .then(payload => this.getService('users').get(payload.userId))
      .then(user => this.setItem('user', user))
  }

  public logout() {
    return this._app.logout().then(() => {
      this.setItem('user', null)
    })
  }

  // TODO: move this to a Store Service
  public setItem(key, item) {
    const value = isObject(item) ? JSON.stringify(item) : item
    window.localStorage.setItem(key, value)
  }

  public getItem(key) {
    const item = window.localStorage.getItem(key)
    return JSON.parse(item)
  }
}
function isObject(item: any) {
  return typeof item === 'object' && item !== null
}

import { Injectable } from '@angular/core';
import { api } from '@env/environment';

import feathers from '@feathersjs/feathers';
import * as io from 'socket.io-client';
import * as feathersRx from 'feathers-reactive';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map'
@Injectable()
export class SocketService {
    public _socket: any;
    public _app: FeathersApp;
    public _url: string;
    constructor() {
        this._url = api;
        this.init()
    }

    init() {
        this._socket = io(this._url);
        this._app = feathers()
            .configure(feathersSocketIOClient(this._socket, {timeout:20000}))
            .configure(feathersAuthClient({                   // add authentication plugin
                storage: window.localStorage
            }))
            .configure(feathersRx({                           // add feathers-reactive plugin
                idField: '_id'
            }));
    }




    // expose services
    public getService(name: string): any {
        return this._app.service(name)
    }

    public getValue( key ){
        return  JSON.parse(window.localStorage.getItem(key))['user']
    }

    // expose authentication
    public authenticate(credentials?): Promise<any> {
        return this._app.authenticate(credentials);
    }

    // expose logout
    public logout() {
        return this._app.logout();
    }


}

export interface FeathersApp {
    service(name: string): any;
    authenticate( credentials ): Promise<any>;
    logout(): any;
    get(key): any
}

export interface FeathersService {
    on(methodName: string, callback: Function);

    find(params, callback: Function): void;
    find(callback: Function): void;
    find(params?): Observable<any>;

    get(id, params, callback: Function): void;
    get(id, callback: Function): void;
    get(id, params?): Observable<any>;

    create(data, params, callback: Function): void;
    create(data, callback: Function): void;
    create(data, params?): Observable<any>;

    update(id, data, params, callback: Function): void;
    update(id, data, callback: Function): void;
    update(id, data, params?): Observable<any>;

    patch(id, data, params, callback: Function): void;
    patch(id, data, callback: Function): void;
    patch(id, data, params?): Observable<any>;

    remove(id, params, callback: Function): void;
    remove(id, callback: Function): void;
    remove(id, params?): Observable<any>;

    setup(app, path): void;
  
}
import { Injectable } from '@angular/core';
import { api } from '@env/environment';
import * as feathers from 'feathers-client'; 
import * as io from 'socket.io-client'; 
@Injectable()
export class SocketService {
    public socket: any;
    public _app: FeathersApp;
    public _url: string;
    constructor() {
        this._url = api;
    }
    
    init() {
        this.socket = io(this._url);
        return feathers()
            .configure(feathers.socketio(this.socket,{timeout:10000}))
            .configure(feathers.hooks())
            .configure(feathers.authentication({ storage: window.localStorage }));
    }
}

export interface FeathersApp {
    service(name: string): FeathersService;
    authenticate(): Promise<any>;
}

export interface FeathersService {
    on(methodName: string, callback: Function);

    find(params, callback: Function): void;
    find(callback: Function): void;
    find(params?): Promise<any>;

    get(id, params, callback: Function): void;
    get(id, callback: Function): void;
    get(id, params?): Promise<any>;

    create(data, params, callback: Function): void;
    create(data, callback: Function): void;
    create(data, params?): Promise<any>;

    update(id, data, params, callback: Function): void;
    update(id, data, callback: Function): void;
    update(id, data, params?): Promise<any>;

    patch(id, data, params, callback: Function): void;
    patch(id, data, callback: Function): void;
    patch(id, data, params?): Promise<any>;

    remove(id, params, callback: Function): void;
    remove(id, callback: Function): void;
    remove(id, params?): Promise<any>;

    setup(app, path): void;
}

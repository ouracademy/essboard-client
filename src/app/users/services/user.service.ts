import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../model/user';

export abstract class UserService {
     users$: Subject<any>;
     currentUser$: Subject<any>;
    abstract getUsers();
    abstract get(id: number | string);
    abstract delete(id: number | string);
    abstract search(email: string);
    abstract getByUsername(username:string);
    abstract patch(data);
    abstract setAppKeyTrello(data);
}
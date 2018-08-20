
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../../shared/services/socket-io';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';

@Injectable()
export class UserService  {

    public items$: Observable<any>;
    private userService: any;
    private itemsObserver: any;
    private user: User;
    public _app :  any;
    private dataStore: {
        items: User[]
    };
      constructor(public socketService: SocketService) {
        this._app =  this.socketService.init();
        this.userService = this._app.service('users');
        this.userService.on('created', (newItem) => this.onCreated(newItem));
        this.userService.on('updated', (updatedItem) => this.onUpdated(updatedItem));
        this.userService.on('removed', (removedItem) => this.onRemoved(removedItem));
        this.items$ = new Observable(observer => this.itemsObserver = observer)
            .share();
        this.dataStore = { items: [] };
    }
    public find() {
        this.userService.find((err, items: User[]) => {
            if (err) return console.error(err);

            this.dataStore.items = items;
            this.itemsObserver.next(this.dataStore.items);
        });
    }
    public create(email: string, password: string): void {
        this.userService.create({
            email: email,
            password: password
        });
    }
    public login(credentials: Credentials) {
        this._app.authenticate({
            type: 'local',
            'email': credentials.name,
            'password': credentials.password
        }).then( (result) => {
            this.user = new User(result.data.id,result.data.email,result.data.avatar);
        }).catch(function (error) {
            console.error('Error authenticating!', error);
        });
    }
    public get isLoggedIn():boolean{
        return !!this.user;
    }
    public logout() {
        console.log(window.localStorage);
        this._app.logout().then(() => window.location.href = '/');

    }

    private getIndex(id: string): number {
        let foundIndex = -1;

        for (let i = 0; i < this.dataStore.items.length; i++) {
            if (this.dataStore.items[i].id === id) {
                foundIndex = i;
            }
        }

        return foundIndex;
    }



    // Listen for when a new message has been created
    private onCreated(newItem: Object) {
        //this.dataStore.items.push(new MyModel(newItem.id,newItem.text));
        console.log('Someone created a message', newItem);
        //PROJECTS.push(new Auth(newItem.id,newItem.text));
        // this.itemsObserver.next(PROJECTS);
    }

    private onUpdated(updatedItem: User) {
        const index = this.getIndex(updatedItem.id);

        this.dataStore.items[index] = updatedItem;

        this.itemsObserver.next(this.dataStore.items);
    }

    private onRemoved(removedItem) {
        const index = this.getIndex(removedItem.id);

        //this.dataStore.checks.splice(index, 1);

        this.itemsObserver.next(this.dataStore.items);
    }

}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../model/user';
import { SocketService, FeathersApp, FeathersService } from '../../../shared/services/socket-io';

@Injectable()
export class UserSocketService extends UserService {
    usersObserver: any;
    userObserver: any;
    userOb: Observable<any>;

    user: User;
    users: User[];

    _app: FeathersApp;
    service: FeathersService;

    constructor(public socketService: SocketService, private router: Router) {
        super();
        this._app = this.socketService.init();
        this.service = this._app.service('users');

        this.usersOb = new Observable(observer => this.usersObserver = observer).share();
        this.currentUserOb = new Observable(observer => this.userObserver = observer).share();

        this.user = null;
        this.users = [];
    }

    getUsers() {
        this._app.authenticate().then(data => {
            this.service.find({
                query: {
                    $sort: { createdAt: -1 }
                }
            }, (err, items: any) => {
                if (err) return console.error(err);
                this.users = items.data.map((x) =>
                    this.toUser(x));
                this.usersObserver.next(this.users);
            });
        });
    }

    get(id: string) {
        console.log(id);
        this._app.authenticate().then(data => {
            this.service.get(id,
                (err, x: any) => {
                    if (err) return console.error(err);
                    this.user = new User(x._id, x.username, x.email, x.createdAt);
                    this.userObserver.next(this.user);
                    console.log('item of server ', x);
                })
        });
    }

    getByUsername(username: string) {
        this.service.find({
            query: {
                name: username,
                $limit: 1
            }
        }, (err, item: any) => {
            if (err) return console.error('error', err);
            this.user = this.toUser(item.data[0]);
            this.userObserver.next(this.user);
        });
    }

    delete(id: number | number) {
        this.users.splice(id, 1);
        this.usersObserver.next(this.users);
        this.service.remove(id)
            .then((result) => {
                this.router.navigate(['admin/users']);
            })
            .catch(function (error) {
                alert('Error al eliminar  tu proyecto');
            });
    }

    patch(user: User): Promise<void> {
        return this._app.authenticate().then(data =>
            this.service.patch(user.id, {
                name: user.name,
                email: user.email
            }).catch(function (error) {
                throw error;
            }));
    }
    setAppKeyTrello(user: User): Promise<void> {
        console.log(user);
        return this._app.authenticate().then(data =>
            this.service.patch(user.id, {
                appKeyTrello: user.appKeyTrello
            }).catch(function (error) {
                throw error;
            }));
    }

    private toUser(source) {
        return new User(source._id, source.name, source.email, source.createdAt);
    }

    search(email: string) {
        this._app.authenticate().then(data => {
            this.service.find({
                query: {
                    email: { $regex: email, $options: 'igm' }
                }
            }, (err, items: any) => {
                if (err) { return console.error('error', err); }
                this.users = items.data.map((x) => this.toUser(x));
                this.usersObserver.next(this.users);
            });
        });
    }
}

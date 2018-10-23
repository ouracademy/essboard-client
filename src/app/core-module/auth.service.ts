import { Injectable } from '@angular/core';
import { SocketService } from '@core/socket.service';
import { Credentials, User } from '@no-module/models/user';
import { tap } from 'rxjs/operators';
import { BehaviorSubject , Subject} from 'rxjs';

@Injectable()
export class AuthService {
    // store the URL so we can redirect after logging in
    private _redirectURL: string;

    public notifications$ = new BehaviorSubject([])
    public newNotification$ = new Subject()
    


    constructor(public socketService: SocketService) {
        
        const notificationService =  this.socketService.getService('notifications')
        notificationService.on('created', (newItem) => this.newNotification$.next(newItem));
        notificationService.find().then( result => console.log( 'nots', result ))
    }

    set redirectURL(URL: string) {
        this._redirectURL = URL;
    }

    get redirectURL() {
        return this._redirectURL ? this._redirectURL : '/me/projects';
    }

    public login(credentials: Credentials): Promise<User> {
        return this.socketService.authenticate({
            'strategy': 'local',
            'email': credentials.email,
            'password': credentials.password
        }).then((result) => {
            window.localStorage.setItem('user', JSON.stringify(result));
            return this.user;
        }).catch(function (error) {
            console.log( error )
            throw error;
        });
    }

    public loginWithToken(){
        // const token = window.localStorage.getItem('feathers-jwt')
        // if( token ){
        //     this.logoutToLogin().then( () =>{
        //         this.socketService.authenticate({type: 'token', token: token})
        //     })
        // }
    }


    public get isLoggedIn(): boolean {
        return !!window.localStorage.getItem('user');
    }

    public logout(): Promise<boolean> {
        return this.socketService.logout().then(() => {
            localStorage.removeItem('user');
            return true;
        });
    }

    private logoutToLogin(): Promise<boolean> {
        return this.socketService.logout().then(() => {
            return true;
        });
    }

    public get user(): User {
        const data = JSON.parse(window.localStorage.getItem('user'));
        return data ?  new User(data['_id'], data['name'], data['email'], data['createdAt'], data['appKeyTrello']) :  new User('','');
    }
    public set user(user: User) {
        window.localStorage['user'] = JSON.stringify(user);
    }
    public haveThisSession(sessionId: string): boolean {
        const data = JSON.parse(window.localStorage.getItem('user'));
        return data.sessionsId.indexOf(sessionId) !== -1;
    }

    public signup(user: User) {
        return this.socketService.getService('users').watch().create({
            name: user.name,
            email: user.email,
            password: user.password
        }).pipe(
            tap(val => this.login(new Credentials(user.email, user.password)) )
    }
}

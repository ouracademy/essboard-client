import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from '../model/comment';
import { Subject } from 'rxjs/Subject';
import { DialogService } from './dialog.service';
import { SocketService } from '@core/socket.service';

@Injectable()
export class DialogSocketService extends DialogService {

    comments: Comment[] = [];
    _app: any;
    service: any;

    constructor(public socketService: SocketService, private router: Router) {
        super();
        this._app = this.socketService.init();
        this.service = this._app.service('dialog-sessions');
        this.service.on('created', (newItem) => this.onCreated(newItem));
        this.comments$ = new Subject<any>()
    }

    private transform(obj: any) {
        return new Comment(obj.text, obj.userName);
    }

    getComments(sessionId) {
        this._app.authenticate().then(() => {
            this.service.find({
                query: { sessionId: sessionId },
            }, (err, items: any) => {
                if (err) return console.error(err);
                this.comments = items.data.map((obj) => this.transform(obj));
                this.comments$.next(this.comments);
            })
        });
    }

    add(comment: string, sessionId: string) {
        this._app.authenticate().then(() => {
            this.service.create(
                {
                    text: comment,
                    userName: this._app.get('user').name,
                    sessionId: sessionId
                })
                .then((result) => {
                    console.log(result);
                })
                .catch(function (error) {
                    console.error('Error saving!', error);
                })
        });
    }

    private onCreated(newItem: any) {
        this.comments.push(this.transform(newItem));
        this.comments$.next(this.comments);
    }

}

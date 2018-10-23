import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { User } from '../model/user';
import { SocketService, FeathersApp, FeathersService } from '@core/socket.service';

@Injectable()
export class UserSearchSocketService {


    service: any;

    constructor(public socketService: SocketService) {

        this.service = this.socketService.getService('users');
    }

    private toUser(source) {
        return new User(source._id, source.name, source.email, source.createdAt);
    }

    search(email: string) {

        return this.service.watch().find({
            query: {
                email: { $regex: email, $options: 'igm' }
            }
        }).pipe(map(items => {
            console.log( 'items', items )
            return items['data'].map((x) => this.toUser(x))
        }
        ));
    }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@no-module/models/project';
import { Observable, Subject } from 'rxjs';
import { SessionService } from './session.service';
import { SocketService } from '@core/socket.service';
import { ToSession } from '@no-module/transforms/to-session';
import { GetKeys } from '@no-module/util/get-keys-from-object';
import { AuthService } from '@core/auth.service';

@Injectable()
export class SessionSocketService extends SessionService {
    items: Observable<any>;
    sessionObserver: any;
    session: Session;
    sessions: Session[];
    _app: any;
    service: any;
    constructor(public socketService: SocketService, private auth: AuthService, private router: Router) {
        super();
        this._app = this.socketService.init();
        this.service = this._app.service('sessions');
        this.service.on('patched', (patchedItem) => this.onPatched(patchedItem));
        this.currentSession$ = new Subject<any>();
        this.session = null;
    }
    getSession(id: string) {
        this.service.get(id,
            (err, item: any) => {
                if (err) return console.error(err);
                console.log('sobre una sesion', item)
                this.session = ToSession.withCompleteTransformation(item);
                GetKeys.setSource(item.alphas);
                this.currentSession$.next(this.session);
            });
    }
    colaboreUsingUserIdInProject(idSession: string, idProject: string) {
        let userId= this.auth.user.id;
        let data = { participants : userId };
        let action = { '$addToSet': data };
        this.patch(idSession, action, {});
    }

    delete(id) {
        this.service.remove(id)
            .then((result) => {
                this.router.navigate(['user/projects']);
            })
            .catch(function (error) {
                alert("Error al eliminar  tu proyecto");
            });
    }
    setStateAsWorking(id, dimensionMetadataId, stateMetadataId) {
        let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId);
        let base = 'alphas.' + indexs.dimension + '.states.' + indexs.state;
        let path = base + '.isWorking';
        let params = {};
        let data = { [path]: true };
        let action = { '$set': data };
        this.patch(id, action, params);
    }
    setVoteToCheckpoint(id, dimensionMetadataId, stateMetadataId, checkpointMetadataId, condition) {
        let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId);
        let username = this.auth.user.name;
        let base = 'alphas.' + indexs.dimension + '.states.' + indexs.state + '.checklist';
        let path = base + '.$.favorablesVotes';
        let search = base + '.metadataId';
        let params = { ["query"]: { [search]: checkpointMetadataId } };
        let data = { [path]: username };
        let action = { '$addToSet': data };
        this.patch(id, action, params);
    }
    setUnVoteToCheckpoint(id, dimensionMetadataId, stateMetadataId, checkpointMetadataId, condition) {
        let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId);
        let username = this.auth.user.name;
        let base = 'alphas.' + indexs.dimension + '.states.' + indexs.state + '.checklist';
        let path = base + '.$.favorablesVotes';
        let search = base + '.metadataId';
        let params = { ["query"]: { [search]: checkpointMetadataId } };
        let data = { [path]: username };
        let action = { '$pull': data };
        this.patch(id, action, params);
    }
    private patch(id, data, params) {
        this._app.authenticate().then(() => {
            this.service.patch(
                id, data,
                params)
                .then((result) => {
                    console.log('edited', result)
                })
                .catch(function (error) {
                    console.log(error)
                })
        });

    }

    setCheckpointTo(id, dimensionMetadataId, stateMetadataId, checkpointMetadataId, condition) {
        let indexs = GetKeys.getIndexs(dimensionMetadataId, stateMetadataId);
        let base = 'alphas.' + indexs.dimension + '.states.' + indexs.state + '.checklist';
        let path = base + '.$.isAchieved';
        let search = base + '.metadataId';
        let params = { ["query"]: { [search]: checkpointMetadataId } };
        let data = { [path]: condition };
        let action = { '$set': data };
        this.patch(id, action, params);
    }

    private onPatched(patchedItem: any) {
        if (patchedItem._id === this.session.id) {
            this.session = ToSession.withCompleteTransformation(patchedItem);
            GetKeys.setSource(patchedItem.alphas);
            this.currentSession$.next(this.session);
        }
    }
    public colaboreUsingSessionsIdInUser(idSession) {
        this._app.authenticate().then(() => {
            this._app.service('users').patch(
                this.auth.user.id,
                { $addToSet: { sessionsId: idSession } }
            ).then((result) => {
            })
                .catch(function (error) {
                    console.log(error)
                })
        });
    }
}
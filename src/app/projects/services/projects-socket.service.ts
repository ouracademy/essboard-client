import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ProjectsService } from './projects.service';
import { SocketService } from '@core/socket.service';
import { Project } from '@no-module/models/project';

@Injectable()
export class ProjectsSocketService extends ProjectsService {

    projects: Project[];
    _app: any;
    service: any;
    items$ : Subject<any>;
    constructor(public socketService: SocketService, private router: Router) {
        super();
        this._app = this.socketService.init();
        this.service = this._app.service('projects');
        this.service.on('created', (newItem) => this.onCreated(newItem));
        this.items$ = new Subject()
        this.projects = [];
    }

    private transformSourceToProject(obj: any) {
        return new Project(obj._id, obj.name, obj.description, obj.createdBy, obj.createdAt);
    }

    getProjects() {
        this._app.authenticate().then(() => {
            this.service.find({
                query: {
                    $or: [
                        { createdBy: this._app.get('user')._id },
                        { members: this._app.get('user')._id }
                    ]
                }
            }, (err, items: any) => {
                if (err) return console.error(err);
                this.projects = items.data.map((obj) => this.transformSourceToProject(obj));
                this.items$.next(this.projects);
            })
        });
    }
    add(project: Project) {
        this._app.authenticate().then(data => {
            this.service.create(
                {
                    name: project.name,
                    description: project.description,
                    members: []
                })
                .then((result) => {
                })
                .catch(function (error) {
                    console.error('Error saving!', error);
                    alert("Error al crear tu proyecto");
                })
        });
    }

    public inviteTo(project: Project, user) {
        this.service.patch(
            project.id,
            { $addToSet: { members: user.id } }
            // { query: { action: 'invite', data: user.id } }
        ).then((result) => {
            alert('Invitado al proyecto');
        })
            .catch(function (error) {
                console.log(error, "Error al editar  tu proyecto");
            });
    }
    public desinviteTo(project, invited) {
        this.service.patch(
            project.id,
            { $pull: { members: invited.id } },
            { query: { action: 'desinvite', data: invited.id } }
        ).then((result) => {
            console.log('desinvitado');
        })
            .catch(function (error) {
                console.log(error, "Error al editar  tu proyecto");
            });
    }
    private onCreated(newItem: any) {
        this.projects.unshift(this.transformSourceToProject(newItem));
        this.items$.next(this.projects);
    }
}

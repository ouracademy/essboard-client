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

        this.service = this.socketService.getService('projects');
        this.service.on('created', (newItem) => this.onCreated(newItem));
        this.items$ = new Subject()
        this.projects = [];
    }

    private transformSourceToProject(obj: any) {
        return new Project(obj._id, obj.name, obj.description, obj.createdBy, obj.createdAt);
    }

    getProjects() {
   
            this.service.find().then( items  => {
                console.log('projects', items )
                this.projects = items.data.map((obj) => this.transformSourceToProject(obj));
                this.items$.next(this.projects);
            }, err => console.log(err))
    }
    add(project: Project) {

            this.service.create(
                {
                    name: project.name,
                    description: project.description,
                    members: []
                }).then( result => {
                    console.log( result )
                })
     
    }

    public inviteTo(project: Project, user) {
        this.service.patch(
            project.id,
            { $addToSet: { members: user.id } }
            // { query: { action: 'invite', data: user.id } }
        )
    }
    public desinviteTo(project, invited) {
        this.service.patch(
            project.id,
            { $pull: { members: invited.id } },
            { query: { action: 'desinvite', data: invited.id } }
        )
    }
    private onCreated(newItem: any) {
        console.log('created', newItem )
        this.projects = [ ...this.projects, this.transformSourceToProject(newItem)];
        this.items$.next(this.projects);
    }
}



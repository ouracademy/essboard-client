import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ProjectsService } from './projects.service';
import { SocketService } from '@core/socket.service';
import { Project } from '@no-module/models/project';
import { Router } from '@angular/router'
@Injectable()
export class ProjectsSocketService extends ProjectsService {

    projects: Project[];
    service: any;
    items$: Subject<any>;
    constructor(public socketService: SocketService, private router: Router) {
        super();

        this.service = this.socketService.getService('projects');
        this.items$ = new Subject()
        this.projects = [];
    }
    getProjects() {
        this.service.find().then(items => {
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
            }).then(result => {
                this.addProjectCreated(result)
                this.router.navigate(['me/projects/' + result._id])
            })
    }
    private addProjectCreated(newItem: any) {
        this.projects = [...this.projects, this.transformSourceToProject(newItem)];
        this.items$.next(this.projects);
    }
    private transformSourceToProject(obj: any) {
        return new Project(obj._id, obj.name, obj.description, obj.createdBy, obj.createdAt);
    }
}



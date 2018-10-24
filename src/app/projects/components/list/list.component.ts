import { Component, OnInit } from '@angular/core';
import { Project } from '@no-module/models/project';
import { ProjectsService } from '../../services/projects.service';
import { AuthService } from '@core/auth.service';
import { User } from '@no-module/models/user';
import { MatDialog } from '@angular/material';
import { CreateComponent } from '../create/create.component'

@Component({
    selector: 'project-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
    title = 'Mis proyectos';
    projects: Project[] = [];
    loaded = false;
    user: User;

    constructor(
        private matDialog: MatDialog,
        private projectsService: ProjectsService,
        private auth: AuthService) { }

    ngOnInit(): void {
        this.user = this.auth.user;
        this.projectsService.items$.subscribe((items: Project[]) => {
            this.projects = items;
            this.loaded = true
        });
        this.projectsService.getProjects();
    }

    createProject(): void {
        this.matDialog.open(CreateComponent)
    }
}

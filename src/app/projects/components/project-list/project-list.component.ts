import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '@no-module/models/project';
import { ProjectsService } from '../../services/projects.service';
import { AuthService } from '@core/auth.service';
import { User } from '@no-module/models/user';
import { MatDialogClose, MatDialog } from '@angular/material';
import { ProjectCreateComponent } from '../project-create/project-form.component'
@Component({
    selector: 'project-list',
    templateUrl: 'project-list.component.html',
    styleUrls: ['list.component.css']
})
export class ProjectListComponent implements OnInit {
    title = 'Mis proyectos';
    hideForm: boolean = true;
    projects: Project[] = [];
    loaded = false;
    private subscription: Subscription;

    user: User;

    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private projectsService: ProjectsService,
        private auth: AuthService) { }

    ngOnInit(): void {
        this.user = this.auth.user;
        this.subscription = this.projectsService.items$.subscribe((items: Project[]) => {
            this.projects = items;
            this.loaded = true
        });

        this.projectsService.getProjects();
    }

    createProject(): void {
        this.matDialog.open(ProjectCreateComponent)
    }




}

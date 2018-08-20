import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../../../shared/models/project';
import { ProjectsService } from '../../services/projects.service';
import { AuthService } from '../../../../auth.service';
import { User } from '../../../users/model/user';

@Component({
    selector: 'my-app',
    templateUrl: 'project-list.component.html',
    styleUrls: ['list.component.css']
})
export class ProjectListComponent implements OnInit {
    title = 'Mis proyectos';
    hideForm: boolean = true;
    projects: Project[] = [];
    private subscription: Subscription;

    user: User;

    constructor(
        private router: Router,
        private projectsService: ProjectsService,
        private auth: AuthService) { }

    ngOnInit(): void {
        this.user = this.auth.user;
        this.subscription = this.projectsService.items.subscribe((items: Project[]) => {
            this.projects = items;
        });

        this.projectsService.getProjects();
    }

    showForm(): void {
        this.hideForm = !this.hideForm;
    }

    closeCreateForm() {
        this.hideForm = true;
    }


}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../../shared/models/project';
import { User } from '../../../../users/model/user';

@Component({
    selector: 'project-card',
    templateUrl: 'project-card.component.html'
})
export class ProjectCardComponent {
    @Input() project: Project;
    @Input() user: User;

    constructor(private router: Router) { }

    select() {
        this.router.navigate(['/me/projects', this.project.id]);
    }

    get isInvited(): Boolean {
        return this.project.isInvited(this.user);
    }

}

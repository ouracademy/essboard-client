import { Component } from '@angular/core';
import { Project } from '@no-module/models/project';
import { ProjectsService } from '../../services/projects.service';
import { MatDialogRef } from '@angular/material';
@Component({
    selector: 'project-form',
    templateUrl: 'project-form.component.html'
})
export class ProjectCreateComponent {
    model = new Project('', '', '', '');

    constructor( private reference: MatDialogRef<ProjectCreateComponent>, private projectService: ProjectsService) { }

    onSubmit() {
        this.projectService.add(this.model);
        this.reference.close()
    }

}

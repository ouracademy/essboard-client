import { Component } from '@angular/core';
import { Project } from '@no-module/models/project';
import { ProjectsService } from '../../services/projects.service';
import { MatDialogRef } from '@angular/material';
@Component({
    selector: 'project-form',
    templateUrl: 'create.component.html'
})
export class CreateComponent {
    model = new Project('', '', '', '');

    constructor(private reference: MatDialogRef<CreateComponent>, private projectService: ProjectsService) { }

    onSubmit() {
        this.projectService.add(this.model);
        this.reference.close()
    }
}

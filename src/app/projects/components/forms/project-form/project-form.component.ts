import { Component, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../../../shared/models/project';
import { ProjectsService } from '../../../services/projects.service';
@Component({
    selector: 'project-form',
    templateUrl: 'project-form.component.html'
})
export class ProjectFormComponent {
    @Output() onCloseForm = new EventEmitter<boolean>();
    model = new Project('', '', '', '');
    submitted = false;
    active = true;
    constructor(private projectService: ProjectsService) { }

    onSubmit() {
        this.projectService.add(this.model);
        this.submitted = true;
        this.cancel();
    }

    cancel() {
        this.onCloseForm.emit(false);
    }
}

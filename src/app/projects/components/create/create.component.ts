import { Component } from '@angular/core'
import { ProjectsService } from '../../services/projects.service'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'project-form',
  templateUrl: 'create.component.html'
})
export class CreateComponent {
  name: string
  description: string

  constructor(
    private reference: MatDialogRef<CreateComponent>,
    private projects: ProjectsService
  ) {}

  onSubmit() {
    this.projects.add(this.name, this.description)
    this.reference.close()
  }
}

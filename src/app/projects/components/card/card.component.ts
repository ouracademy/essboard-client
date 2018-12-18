import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Project } from '@no-module/models/project'
import { User } from '@no-module/models/user'

@Component({
  selector: 'project-card',
  templateUrl: 'card.component.html',
  styles: [
    `
      .corner-tr {
        top: 5px;
        right: 5px;
        position: absolute;
      }
    `
  ]
})
export class CardComponent {
  @Input() project: Project
  @Input() user: User

  constructor(private router: Router) {}

  handleSelection() {
    this.router.navigate(['/me/projects', this.project.id])
  }

  get isOwner(): Boolean {
    return this.project.isOwner(this.user)
  }
}

import { Component, OnInit } from '@angular/core'
import { ProjectService } from '../../services/project.service'
import { SharedService } from '@core/shared.service'
import { Member } from 'app/members/members.service'
import { User } from '@models/user'

@Component({
  selector: 'project-share-form',
  templateUrl: 'share.component.html'
})
export class ShareComponent implements OnInit {
  public members: Member[] = []

  constructor(
    private projectService: ProjectService,
    private dialog: SharedService
  ) {}

  ngOnInit() {
    this.projectService.members$.subscribe(members => {
      this.members = members
    })
  }

  handleUserSelected(user: User) {
    this.projectService.invite(user).then(member => {
      this.dialog.showSucces('Usuario invitado!')
    })
  }

  delete(member) {
    this.projectService.remove(member)
  }
}

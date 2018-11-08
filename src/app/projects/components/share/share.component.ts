import { Component, OnInit, Input, Inject } from '@angular/core'
import { Project } from '@no-module/models/project'
import { ProjectService } from '../../services/project.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'project-share-form',
  templateUrl: 'share.component.html'
})
export class ShareComponent implements OnInit {
  @Input() project: Project
  public invitedsEmail: any
  public message: String
  public inviteds: any
  constructor(
    private projectService: ProjectService,
    private reference: MatDialogRef<ShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data
  }
  ngOnInit() {
    this.inviteds = []
    this.invitedsEmail = null
    this.message = ''
  }
  send() {
    if (this.existsInUsers(this.invitedsEmail)) {
      this.inviteds.push(this.invitedsEmail)
    } else {
      this.message = 'Ups . No encontramos este correo'
    }
  }
  existsInUsers(email) {
    return true
  }

  getSelect(user) {
    this.inviteTo(user)
    // if (!this.project.haveThisMember(user)) {
    //     this.inviteTo(user);
    // }
  }
  inviteTo(user) {
    this.projectService.inviteTo(this.project, user)
    this.inviteds.push(user)
  }
  delete(invited) {
    this.projectService.desinviteTo(invited)
  }
}

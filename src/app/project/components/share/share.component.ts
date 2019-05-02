import { Component, OnInit } from '@angular/core'
import { SharedService } from '@core/shared.service'
import { LoadingClickService } from '@shared/loading-when-clicked'
import { Member } from 'app/members/members.service'
import { ProjectService } from '../../services/project.service'

@Component({
  selector: 'project-share-form',
  templateUrl: 'share.component.html'
})
export class ShareComponent implements OnInit {
  public members: Member[] = []
  message = null

  constructor(
    private projectService: ProjectService,
    private dialog: SharedService,
    private loading: LoadingClickService
  ) {}

  ngOnInit() {
    this.projectService.members$.subscribe(members => {
      this.members = members
    })
  }

  invite(email: string) {
    this.projectService
      .invite(email)
      .then(member => {
        this.message = 'Invitacion enviada con exito'
      })
      .catch(() => {
        this.message = 'La invitacion no se pudo enviar'
      })
      .then(() => {
        this.loading.stopLoading('invite')
        setTimeout(() => (this.message = null), 3000)
      })
  }

  delete(member) {
    this.projectService.remove(member)
  }
}

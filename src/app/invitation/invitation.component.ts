import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Invitation, InvitationsService } from './invitation.service'

@Component({
  selector: 'invitation',
  templateUrl: 'invitation.component.html',
  styleUrls: ['invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  invitation: Invitation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InvitationsService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.service.get(params.get('id'))))
      .subscribe(invitation => {
        if (invitation.is === 'pending') {
          this.invitation = invitation
        } else {
          const redirectRoute =
            'me/projects/' +
            (invitation.is === 'cancelled' ? '' : invitation.project.id)
          this.router.navigate([redirectRoute])
        }
      })
  }

  accept(invitation: Invitation) {
    this.service.accept(invitation.id).then(() => {
      this.redirectToProject(invitation.project.id)
    })
  }

  redirectToProject(id: string) {
    this.router.navigate(['/me/projects', id])
  }

  decline(id) {
    this.service.remove(id).then(() => this.router.navigate(['/me/projects']))
  }
}

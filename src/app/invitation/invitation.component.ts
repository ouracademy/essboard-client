import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { MembersService } from 'app/members/members.service'
import { switchMap } from 'rxjs/operators'
import { Invitation, InvitationsService } from './invitation.service'

@Component({
  selector: 'invitation',
  templateUrl: 'invitation.component.html'
})
export class InvitationComponent implements OnInit {
  invitation: Invitation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InvitationsService,
    private memberService: MembersService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.service.get(params.get('id'))))
      .subscribe(invitation => {
        if ((invitation.is = 'accepted')) {
          this.redirectToProject(invitation.project.id)
        } else {
          this.invitation = invitation
        }
      })
  }

  accept(invitation: Invitation) {
    this.memberService.add(invitation.project.id, 'collaborator').then(() => {
      this.redirectToProject(invitation.project.id)
    })
  }

  redirectToProject(id: string) {
    this.router.navigate(['/me/projects', id])
  }

  decline(id) {
    this.service.remove(id)
  }
}

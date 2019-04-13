import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { MembersService } from 'app/members/members.service'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Invitation, InvitationsService } from './invitation.service'

@Component({
  selector: 'invitation',
  templateUrl: 'invitation.component.html'
})
export class InvitationComponent implements OnInit {
  invitation$: Observable<Invitation>

  constructor(
    private route: ActivatedRoute,
    private service: InvitationsService,
    private memberService: MembersService
  ) {}

  ngOnInit() {
    this.invitation$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.get(params.get('id')))
    )
  }

  accept(invitation: Invitation) {
    this.memberService.add(invitation.project.id, 'collaborator')
  }

  decline(id) {
    this.service.remove(id)
  }
}

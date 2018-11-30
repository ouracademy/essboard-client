import { Component, OnInit } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { combineLatest } from 'rxjs'
import { Member } from 'app/members/members.service'

@Component({
  selector: 'app-online-users',
  template: `
    <div class="row center-xs middle-xs">
      <ngx-avatar
        *ngFor="let onlineMember of members"
        size="30"
        [name]="onlineMember.name"
        [class.offline]="!member.isOnline"
      ></ngx-avatar>
    </div>
  `,
  styles: [
    `
      .offline {
        opacity: 0.1;
      }
    `
  ]
})
export class OnlineUsersComponent implements OnInit {
  members = []

  constructor(private service: SessionService) {}

  ngOnInit() {
    combineLatest(
      this.service.channelSubscriptions$,
      this.service.currentMembers$
    ).subscribe(([onlineMembers, sessionMembers]) => {
      this.members = sessionMembers.map(x => ({
        ...x,
        isOnline: this.isOnline(onlineMembers, x)
      }))
    })
  }

  private isOnline(onlineMembers: any, member: Member): any {
    return onlineMembers.find(onlineMember => onlineMember.userId === member.id)
  }
}

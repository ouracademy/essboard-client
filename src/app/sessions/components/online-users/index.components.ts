import { Component, OnInit, OnDestroy } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { combineLatest, Subscription } from 'rxjs'
import { Member } from 'app/members/members.service'

@Component({
  selector: 'app-online-users',
  template: `
    <div class="row center-xs middle-xs">
      <ngx-avatar
        *ngFor="let member of members"
        size="30"
        [name]="member.name"
        [class.offline]="!member.isOnline"
      ></ngx-avatar>
    </div>
  `,
  styles: [
    `
      .offline {
        opacity: 0.25;
      }
    `
  ]
})
export class OnlineUsersComponent implements OnInit, OnDestroy {
  members = []
  subscription: Subscription

  constructor(private service: SessionService) {}

  ngOnInit() {
    this.subscription = combineLatest(
      this.service.channelSubscriptions$,
      this.service.currentMembers$
    ).subscribe(([onlineMembers, sessionMembers]) => {
      this.members = sessionMembers.map(x => ({
        ...x,
        isOnline: this.isOnline(onlineMembers, x)
      }))
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private isOnline(onlineMembers: any, member: Member): boolean {
    return !!onlineMembers.find(
      onlineMember => onlineMember.userId === member.id
    )
  }
}

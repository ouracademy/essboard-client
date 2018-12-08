import { Component, OnInit, OnDestroy } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { combineLatest, Subscription } from 'rxjs'
import { Member } from 'app/members/members.service'

@Component({
  selector: 'app-online-users',
  template: `
    <div class="row center-xs middle-xs">
      <app-our-avatar
        *ngFor="let member of members"
        [user]="member"
        [isOnline]="member.isOnline"
      ></app-our-avatar>
    </div>
  `
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

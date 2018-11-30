import { Component, OnInit, OnDestroy } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { ProjectService } from 'app/projects/services/project.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-online-users',
  template: `
    <div class="row center-xs middle-xs">
      <ngx-avatar
        *ngFor="let onlineMember of onlineMembers"
        size="30"
        [name]="onlineMember.name"
      ></ngx-avatar>
    </div>
  `
})
export class OnlineUsersComponent implements OnInit, OnDestroy {
  onlineMembers = []
  subscription: Subscription

  constructor(
    private service: SessionService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    //TODO: LISTEN NEW MEMBERS AND MEMBERS CONECTED combine
    this.subscription = this.service.channelSubscriptions$.subscribe(
      onlineMembers => {
        // members
        this.onlineMembers = this.projectService.getInfoMembers(
          onlineMembers.map(member => member['userId'])
        )
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

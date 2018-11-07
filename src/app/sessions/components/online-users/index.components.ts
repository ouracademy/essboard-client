import { Component, OnInit } from '@angular/core'
import { SessionService } from 'app/sessions/services/session.service'
import { ProjectService } from 'app/projects/services/project.service'
import { combineLatest } from 'rxjs'

@Component({
  selector: 'app-online-users',
  template: `
  <div class="row center-xs middle-xs" >
   <ngx-avatar *ngFor="let onlineMember of onlineMembers" size="30" [name]="onlineMember.name"></ngx-avatar>
  </div>
  `
})
export class OnlineUsersComponent implements OnInit {
  onlineMembers = []
  constructor(
    private service: SessionService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    combineLatest(
      this.projectService.projectMembers$,
      this.service.channelSubscriptions$
    ).subscribe(([allMembers, onlineMembers]) => {
      this.onlineMembers = onlineMembers.map(member => {
        const memberTemp = allMembers.find(
          allMember => allMember['userId']['_id'] === member['userId']
        )
        return memberTemp['userId']
      })
    })
  }
}

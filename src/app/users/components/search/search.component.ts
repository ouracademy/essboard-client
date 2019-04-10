import { User } from '@models/user'
import { UserSearchSocketService } from '../../services/user-search-socket.service'
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core'
import { Subscription, combineLatest, Subject, Observable } from 'rxjs'
import { ProjectService } from 'app/project/services/project.service'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Member } from 'app/members/members.service'

@Component({
  selector: 'search-user',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onSelect = new EventEmitter<User>()
  users: User[]
  members: Member[]
  subscription: Subscription
  private searchTerms = new Subject<string>()
  selectedUser: User

  constructor(
    private userService: UserSearchSocketService,
    private project: ProjectService
  ) {}

  ngOnInit(): void {
    // TODO: move to backend member service
    this.subscription = combineLatest(
      this.searchUsers(),
      this.project.members$
    ).subscribe(([users, members]) => {
      this.users = users
      this.members = members
    })
  }

  private searchUsers(): Observable<User[]> {
    return this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.search(term))
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  invite() {
    console.log(this.selectedUser)
    this.onSelect.emit(this.selectedUser)
    this.searchTerms.next('')
  }

  select(user: User) {
    if (!user.isMember(this.members)) {
      this.selectedUser = user
    }
  }

  isMember(user: User) {
    return user.isMember(this.members)
  }
}

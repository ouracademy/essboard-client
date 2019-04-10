import { User } from '@models/user'
import { UserSearchSocketService } from '../../services/user-search-socket.service'
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core'
import { Subscription, combineLatest, Observable } from 'rxjs'
import { ProjectService } from 'app/project/services/project.service'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Member } from 'app/members/members.service'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'search-user',
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onSelect = new EventEmitter<User>()

  searchControl = new FormControl('', [Validators.email, Validators.required])

  users: User[]
  members: Member[]
  subscription: Subscription

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
    return this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string | User) => {
        const term = typeof value === 'string' ? value : value.email

        console.log({ term })

        return this.userService.search(term)
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  invite(event) {
    event.stopPropagation()
    // if (!user.isMember(this.members)) {
    //   this.selectedUser = user
    // }
    console.log('in invite')
    console.log({
      value: this.searchControl.value
    })

    //this.onSelect.emit(this.selectedUser)
    this.searchControl.reset('')
  }

  isMember(user: User) {
    return user.isMember(this.members)
  }
}

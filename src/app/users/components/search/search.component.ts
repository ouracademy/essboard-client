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
  templateUrl: 'search.component.html',
  styles: [
    `
      .avatar {
        vertical-align: middle;
        display: inline-block;
        margin-right: 8px;
      }
    `
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onSubmit = new EventEmitter<string>()

  searchControl = new FormControl('', [Validators.email, Validators.required])

  users: User[]
  members: Member[]
  subscription: Subscription

  constructor(
    private userService: UserSearchSocketService,
    private project: ProjectService
  ) {}

  ngOnInit() {
    // TODO: move to backend member service
    this.subscription = combineLatest(
      this.searchUsers(),
      this.project.members$
    ).subscribe(([users, members]) => {
      this.users = users
      this.members = members
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private searchUsers(): Observable<User[]> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string | User) => {
        const term = typeof value === 'string' ? value : value.email
        return this.userService.search(term)
      })
    )
  }

  invite(event) {
    event.stopPropagation()
    this.onSubmit.emit(this.searchControl.value)
    this.searchControl.reset('')
  }
}

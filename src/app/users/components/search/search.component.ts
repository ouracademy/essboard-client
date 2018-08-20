
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'search-user',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {

    @Output() onSelect = new EventEmitter<string>();
    keyToSearch: string = "";
    users: User[];

    private subscription: Subscription;

    constructor(private userService: UserService
    ) { }

    ngOnInit(): void {
        this.subscription = this.userService.usersOb.subscribe((users: User[]) => {
            this.users = users;
        });
    }
    onKey(event: any) {
        if (this.keyToSearch == "") {
            this.users = [];
        }
        else {
            this.userService.search(this.keyToSearch);
        }
    }
    select(user) {
        this.onSelect.emit(user);
        this.users = [];
        this.keyToSearch = "";
    }
}
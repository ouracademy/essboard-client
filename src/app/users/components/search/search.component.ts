
import { User } from '../../model/user';
import { UserSearchSocketService } from '../../services/user-search-socket.service';
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

    constructor(private userService: UserSearchSocketService
    ) { }

    ngOnInit(): void {
   
    }
    onKey(event: any) {
        if (this.keyToSearch == "") {
            this.users = [];
        }
        else {
            this.userService.search(this.keyToSearch).subscribe( users =>{
                this.users = users;
            });
        }
    }
    select(user) {
        this.onSelect.emit(user);
        this.users = [];
        this.keyToSearch = "";
    }
}
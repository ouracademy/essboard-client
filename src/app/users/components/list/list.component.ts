
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'my-app',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
    title = 'Mis Usuarios';
    hideForm: boolean = true;
    users : User[];

    private subscription: Subscription;
    
    constructor(private router: Router, private userService: UserService
    ) { }
    
    ngOnInit(): void {
        this.subscription = this.userService.usersOb.subscribe((items: User[]) => {
            this.users = items;
        });
       this.getUsers();
    }

    show(){
        alert(this.users);
    }
    /*

    onSelect(user: User): void {
        this.router.navigate(['/admin/users', user.id]);
    }*/

    getUsers(): void {
        this.userService.getUsers();
    }
    
    showForm(): void {
        this.hideForm = !this.hideForm;
    }
}
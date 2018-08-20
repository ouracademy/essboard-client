
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-user-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;

  word: any;
  hash: any = "68830aef4dbfad181162f9251a1da51b";
  private sub: Subscription;
  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService) {

  }

  ngOnInit() {
    this.subscription = this.service.currentUserOb.subscribe((item: User) => {
      this.user = item;
    });
    this.sub = this.route.params.subscribe(params => {
      let id = +this.route.snapshot.params['id'];
      this.service.get(id);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //add confirmation esperar modal
  delete() {
    this.service.delete(this.user.id);
  }
  viewIcon() {
    // return md5('ffffff') ;
  }
  onKey(event: any) {
    //this.hash = md5(event.target.value);
    //this.hash= event.target.value;
  }

}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs/Subscription';
//import { md5 } from '../../../../shared/models/md5';

@Component({
  selector: 'my-user-detail',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
})
export class ProfileUserComponent implements OnInit, OnDestroy {
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
  public options: any = {
    size: 100,
    fontColor: '#FFFFFF',
    border: "1px solid #d3d3d3",
    isSquare: true,
  };

  ngOnInit() {
    this.subscription = this.service.currentUserOb.subscribe((item: User) => {
      this.user = item;
    });
    this.sub = this.route.params.subscribe(params => {
      let username = this.route.snapshot.params['username'];
      this.service.getByUsername(username);
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
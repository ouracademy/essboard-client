
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { AuthService } from '@core/auth.service';
import { SharedService } from '@core/shared.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'my-user-detail',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(
    private service: UserService,
    private auth: AuthService,
    private sharedService: SharedService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.subscription = this.service.currentUserOb.subscribe((user: User) => {
    //   this.user = user;
    // });
    // let user = this.auth.user;
    // this.service.get(user.id);
    this.user = this.auth.user;
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'name': [this.user.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]
      ]
    });

  }

  onSubmit() {
    console.log(this.user);

    this.service.patch(
      new User(
        this.user.id,
        this.userForm.value['name'],
        this.user.email,
        this.user.createdAt
      )).then(() => this.onSuccess())
      .catch((error) => this.onError(error));
  }

  private onSuccess() {
    this.sharedService.showSucces(':)', 'Usuario actualizado');
  }

  private onError(error: string) {
    this.sharedService.showError('Upps!', error);
  }
}

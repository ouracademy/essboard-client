
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationMessagesService, MessageBag } from 'ng2-custom-validation';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'my-user-detail',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  userForm: FormGroup;
  errors = new MessageBag();
  user: User;

  constructor(
    private service: UserService,
    private auth: AuthService,
    private validation: ValidationMessagesService,
    private notification: NotificationsService,
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

    this.validation
      .seeForErrors(this.userForm)
      .subscribe((errors: MessageBag) => this.errors = errors);
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
    this.notification.success(':)', 'Usuario actualizado');
  }

  private onError(error: string) {
    this.notification.error('Upps!', error);
  }
}

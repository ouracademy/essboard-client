
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationMessagesService, MessageBag } from 'ng2-custom-validation';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../../../auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'trello-settings',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
})
export class TrelloSettingsComponent implements OnInit {
  appKeyForm: FormGroup;
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
    this.user = this.auth.user;
    this.buildForm();
  }

  buildForm(): void {
    this.appKeyForm = this.fb.group({
      'appKey': [this.user.appKeyTrello, [
        Validators.required,
        Validators.minLength(32),
        Validators.maxLength(32)
      ]
      ]
    });

    this.validation
      .seeForErrors(this.appKeyForm)
      .subscribe((errors: MessageBag) => this.errors = errors);
  }

  onSubmit() {
    this.user.appKeyTrello = this.appKeyForm.value['appKey'];
    this.service.setAppKeyTrello(
      this.user
    ).then(() => this.onSuccess())
      .catch((error) => this.onError(error));
  }

  private onSuccess() {
    this.auth.user = this.user;
    this.notification.success(':)', 'App Key establecido');
  }

  private onError(error: string) {
    this.notification.error('Upps!', error);
  }
}

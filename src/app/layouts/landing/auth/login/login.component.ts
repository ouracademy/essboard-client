import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../../../../modules/users/model/credentials';

import { AuthService } from '../../../../auth.service';
import { ValidationMessagesService, MessageBag } from 'ng2-custom-validation';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = new MessageBag();

  constructor(
    private router: Router,
    private auth: AuthService,
    private notification: NotificationsService,
    private validation: ValidationMessagesService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]
      ],
      'password': ['']
    });

    this.validation
      .seeForErrors(this.loginForm)
      .subscribe((errors: MessageBag) => this.errors = errors);
  }

  onSubmit() {
    this.auth.login(new Credentials(this.loginForm.value['email'], this.loginForm.value['password'])
    ).then(() => this.onSuccess())
     .catch((error) => this.onError(
        `Lo sentimos, Essboard no renoce
        a estas credenciales como un usuario.`
        ));
  }

  private onSuccess() {
    this.router.navigate([this.auth.redirectURL]);
  }

  private onError(error: string) {
    this.notification.error('Upps!', error);
  }

}


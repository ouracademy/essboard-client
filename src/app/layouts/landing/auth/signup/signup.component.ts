import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../auth.service';
import { ValidationMessagesService, MessageBag } from 'ng2-custom-validation';
import { NotificationsService } from 'angular2-notifications';
import { notificationOptions } from '../../../../shared/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupComponent implements OnInit {
  private signupForm: FormGroup;
  errors = new MessageBag();
  options = notificationOptions;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private notification: NotificationsService,
    private validation: ValidationMessagesService ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(1), // like github
        Validators.maxLength(25),
      ]],
      'email': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]]
    });

    this.validation
      .seeForErrors(this.signupForm)
      .subscribe((errors: MessageBag) => this.errors = errors);
  }

  onSubmit() {
    this.auth.signup(this.signupForm.value)
      .then(() => this.login())
      .catch((error) => this.onError(`Ya existe un usuario para esa cuenta`));
  }

  private login() {
    this.auth.login(this.signupForm.value)
      .then(() => this.onSuccess())
      .catch((error) => this.onError(error));
  }

  private onSuccess() {
    this.router.navigate([this.auth.redirectURL]);
  }

  private onError(error: string) {
    this.notification.error('Upps!', error);
  }
}

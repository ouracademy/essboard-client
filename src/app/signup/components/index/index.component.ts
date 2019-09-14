import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '@core/auth.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'app-login',
  template: `
    <app-auth-layout>
      <mat-card>
        <mat-card-content>
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <input
                matInput
                formControlName="name"
                required
                placeholder="Username"
              />
            </mat-form-field>
            <mat-form-field
              appearance="outline"
              class="full-width"
              placeholder="Email"
              required
            >
              <input
                matInput
                formControlName="email"
                placeholder="Email"
                required
              />
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <input
                matInput
                type="password"
                formControlName="password"
                placeholder="Password"
                required
              />
            </mat-form-field>
            <button
              class="width-all mar-0-1 btn-big"
              color="accent"
              type="submit"
              [disabled]="!signupForm.valid"
              mat-raised-button
            >
              SIGN UP
            </button>
          </form>
          <br />
          <div>
            <span
              >Already have an account?<a
                class="info mat-body-1"
                routerLink="/login"
                >Login here</a
              >
            </span>
          </div>
        </mat-card-content>
      </mat-card>
    </app-auth-layout>
  `
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  constructor(
    private router: Router,
    private auth: AuthService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1), // like github
          Validators.maxLength(25)
        ]
      ],
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
      ]
    })
  }

  onSubmit() {
    this.auth
      .signup(this.signupForm.value)
      .then(() => this.onSuccess())
      .catch(error => this.onError(error))
  }

  private onSuccess() {
    this.router.navigate([this.auth.redirectURL])
  }

  private onError(error: any) {
    this.sharedService.showError(
      'Upps!',
      `Already there is a user with your username`
    )
  }
}

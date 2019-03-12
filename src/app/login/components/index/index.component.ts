import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from '@core/auth.service'
import { SharedService } from '@core/shared.service'
import { Credentials } from '@models/user'
import { LoadingClickService } from '@shared/loading-when-clicked'
@Component({
  selector: 'app-login',
  template: `
    <app-auth-layout>
      <mat-card>
        <mat-card-content class="row">
          <form
            class="align-center"
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
          >
            <mat-form-field
              floatLabel="never"
              appearance="outline"
              class="width-all"
            >
              <input
                matInput
                formControlName="email"
                placeholder="Correo Electrónico"
              />
              <mat-error errorMessage="email"></mat-error>
            </mat-form-field>
            <mat-form-field
              floatLabel="never"
              appearance="outline"
              class="width-all"
            >
              <input
                matInput
                formControlName="password"
                placeholder="Contraseña"
                type="password"
              />
              <mat-error
                errorMessage="password"
                appearance="outline"
              ></mat-error>
            </mat-form-field>
            <button
              class="width-all mar-0-1 btn-big"
              type="submit"
              [disabled]="!loginForm.valid"
              mat-raised-button
              color="accent"
              app-loading-clicked
              app-prevent-offline
              identifierLoading="login"
            >
              Ingresa
            </button>
          </form>
          <br />
          <div class="row aorund-xs middle-xs">
            <span
              ><a class="info mat-body-1" routerLink="/signup"
                >No tienes una cuenta</a
              ></span
            >
          </div>
        </mat-card-content>
      </mat-card>
    </app-auth-layout>
  `,
  styleUrls: ['index.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(
    private loading: LoadingClickService,
    private router: Router,
    private auth: AuthService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      password: ['']
    })
  }

  onSubmit() {
    this.auth
      .login(
        new Credentials(
          this.loginForm.value['email'],
          this.loginForm.value['password']
        )
      )
      .then(() => {
        this.loading.stopLoading('login')
        this.onSuccess()
      })
      .catch(error => {
        this.loading.stopLoading('login')
        this.onError(error)
      })
  }

  private onSuccess() {
    this.router.navigate([this.auth.redirectURL])
  }

  private onError(error: any) {
    this.sharedService.showError(
      'Upps!',
      `Lo sentimos, Essboard no renoce
    a estas credenciales como un usuario.`
    )
  }
}

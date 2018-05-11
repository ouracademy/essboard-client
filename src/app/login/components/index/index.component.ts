import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "@core/auth.service";
import { SharedService } from "@core/shared.service";

@Component({
  selector: "app-login",
  template: `

  <app-auth-layout>
    <p class=''>Ingresa con tus credenciales</p>
    <mat-card>
        <mat-card-content fxLayout="column" fxLayoutGap="20px">
            <form  class="center" [formGroup]='loginForm' (ngSubmit)='onSubmit()'>
              <mat-form-field floatLabel='never' class='all-width'>
                  <input matInput formControlName='email'
                      placeholder='Correo Electrónico'>
                  <mat-error errorMessage='email' ></mat-error>
              </mat-form-field>
              <mat-form-field floatLabel='never' class='all-width'>
                <input matInput formControlName='password'
                    placeholder='Contraseña'>
                <mat-error errorMessage='password' ></mat-error>
              </mat-form-field>
              <button class="auto middle-width" type='submit' [disabled]='!loginForm.valid' mat-raised-button class='main'>Ingresa</button>
            </form>
            <div fxLayout fxLayoutAlign="space-around center">
                <span class="info"><a routerLink='/'>Olvidaste la contraseña</a></span>
                <span class="info"><a routerLink='/signup'>No tienes una cuenta</a></span>
            </div>
        </mat-card-content>
    </mat-card>
  </app-auth-layout>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private auth: AuthService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      password: [""]
    });
  }

  onSubmit() {
    this.auth
      .login(this.loginForm.value["email"], this.loginForm.value["password"])
      .subscribe(
        () => this.onSuccess(),
        error =>
          this.onError(
            `Lo sentimos, Essboard no renoce
        a estas credenciales como un usuario.`
          )
      );
  }

  private onSuccess() {
    this.router.navigate([this.auth.redirectURL]);
  }

  private onError(error: string) {
    this.sharedService.showError("Upps!", error);
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "@core/auth.service";
import { SharedService } from "@core/shared.service";
import { Credentials } from '@no-module/models/user';
@Component({
  selector: "app-login",
  template: `

  <app-auth-layout>
    <mat-card>
        <mat-card-content class="row" >
            <form  class="center" [formGroup]='loginForm' (ngSubmit)='onSubmit()'>
              <mat-form-field floatLabel='never' appearance="outline" class='all-width'>
                  <input matInput formControlName='email'
                      placeholder='Correo Electrónico'>
                  <mat-error errorMessage='email' ></mat-error>
              </mat-form-field>
              <mat-form-field floatLabel='never' appearance="outline" class='all-width'>
                <input matInput formControlName='password'
                    placeholder='Contraseña' type='password'>
                <mat-error errorMessage='password' appearance="outline" ></mat-error>
              </mat-form-field>
              <button class="width-100 mar-0-1 btn-big" type='submit' [disabled]='!loginForm.valid' mat-raised-button  color="accent" >Ingresa</button>
            </form>
            <div class="row aorund-xs middle-xs">
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
  ) { }

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
    this.auth.login(new Credentials(this.loginForm.value['email'], this.loginForm.value['password'])
    ).then(() => this.onSuccess())
      .catch((error) => this.onError(error));

  }

  private onSuccess() {
    this.router.navigate([this.auth.redirectURL]);
  }

  private onError(error: any) {
    this.sharedService.showError("Upps!", `Lo sentimos, Essboard no renoce
    a estas credenciales como un usuario.`);

  }
}

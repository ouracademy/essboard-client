import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { User } from '../../../model/user'
import { UserService } from '../../../services/user.service'
import { AuthService } from '@core/auth.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'trello-settings',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class TrelloSettingsComponent implements OnInit {
  appKeyForm: FormGroup

  user: any

  constructor(
    private service: UserService,
    private auth: AuthService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user
    this.buildForm()
  }

  buildForm(): void {
    this.appKeyForm = this.fb.group({
      appKey: [
        this.user.appKeyTrello,
        [
          Validators.required,
          Validators.minLength(32),
          Validators.maxLength(32)
        ]
      ]
    })
  }

  onSubmit() {
    this.user.appKeyTrello = this.appKeyForm.value['appKey']
    this.service
      .setAppKeyTrello(this.user)
      .then(() => this.onSuccess())
      .catch(error => this.onError(error))
  }

  private onSuccess() {
    this.auth.user = this.user
    this.sharedService.showSucces(':)', 'App Key establecido')
  }

  private onError(error: string) {
    this.sharedService.showError('Upps!', error)
  }
}

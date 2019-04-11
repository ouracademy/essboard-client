import { Component, OnInit } from '@angular/core'
import { AuthService } from '@core/auth.service'

@Component({
  selector: 'invitation',
  templateUrl: 'invitation.component.html'
})
export class InvitationComponent implements OnInit {
  from = {
    name: 'artmadeit'
  }
  project = {
    name: 'Clinica'
  }
  constructor(authService: AuthService) {}

  ngOnInit() {}

  accept() {}
  decline() {}
}

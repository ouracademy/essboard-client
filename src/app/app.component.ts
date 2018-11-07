import { Component } from '@angular/core'
import { AuthService } from '@core/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private auth: AuthService) {
    this.auth.reconnect()
  }
}

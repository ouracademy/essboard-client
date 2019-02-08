import { Component, HostListener } from '@angular/core'
import { AuthService } from '@core/auth.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private auth: AuthService, public sharedService: SharedService) {}

  //this.auth.reconnect()
}

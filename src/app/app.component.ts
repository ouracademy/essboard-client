import { Component, HostListener } from '@angular/core'
import { AuthService } from '@core/auth.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .error-bar {
        background-color: red;
        color: white;
        padding: 10px;
        font-size: 18px;
        border-radius: 5px;

        position: fixed;
        top: 4%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
      }
    `
  ]
})
export class AppComponent {
  constructor(private auth: AuthService, public sharedService: SharedService) {}

  //this.auth.reconnect()
}

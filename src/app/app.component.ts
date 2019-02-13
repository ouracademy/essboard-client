import { Component, OnInit } from '@angular/core'
import { AuthService } from '@core/auth.service'
import { SharedService } from '@core/shared.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .toast {
        position: fixed;
        top: 4%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        color: white;
        padding: 10px;
        font-size: 18px;
        border-radius: 5px;
      }
      .success {
        background-color: green;
      }
      .error {
        background-color: red;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  contentToast = null
  constructor(private auth: AuthService, public sharedService: SharedService) {}
  ngOnInit() {
    this.sharedService.showToast$.subscribe(content => {
      this.contentToast = content
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { SharedService } from '@core/shared.service'
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm'

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
      .info {
        background-color: blue;
      }
      .error {
        background-color: red;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  contentToast = null
  constructor(
    public sharedService: SharedService,
    googleTagManager: Angulartics2GoogleTagManager
  ) {
    googleTagManager.startTracking()
  }

  ngOnInit() {
    this.sharedService.showToast$.subscribe(content => {
      this.contentToast = content
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { SharedService } from '@core/shared.service'
import { Meta } from '@angular/platform-browser'

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
    private meta: Meta,
    googleTagManager: Angulartics2GoogleTagManager
  ) {
    googleTagManager.startTracking()
  }

  ngOnInit() {
    this.sharedService.showToast$.subscribe(content => {
      this.contentToast = content
    })

    const title =
      'Essboard: Essence colaborativo en el monitoreo y dirección de software'
    const description =
      'Una herramienta colaborativa para definir como va tu proyecto y las metas que debes lograr, ' +
      'tomando en cuenta varios aspectos del desarrollo de software'
    const imageURL = 'https://our-academy.org/images/essboard.png'

    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'twitter:card', value: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageURL },

      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageURL }
    ])
  }
}

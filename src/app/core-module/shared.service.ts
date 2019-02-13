import { Injectable } from '@angular/core'
import { NgxAlertsService } from '@ngx-plus/ngx-alerts'
import { Network } from '@ngx-pwa/offline'
import { Subject } from 'rxjs'

@Injectable()
export class SharedService {
  showToast$: Subject<any>
  constructor(
    private alertService: NgxAlertsService,
    private network: Network
  ) {
    this.showToast$ = new Subject()

    this.network.onlineChanges.subscribe(status => {
      const content = status
        ? null
        : { type: 'error', message: 'Ups perdiste conexion' }
      this.showToast(content)
    })
  }

  showError(title, text = '') {
    this.alertService.alertError({ title, text })
  }
  showSucces(title, text = '') {
    this.alertService.alertSuccess({ title, text })
  }

  showToast(content) {
    this.showToast$.next(content)
  }

  get networkStatus() {
    return this.network.onlineChanges
  }
  get isOnline() {
    return this.network.online
  }
}

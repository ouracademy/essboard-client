import { Injectable } from '@angular/core'
import { NgxAlertsService } from '@ngx-plus/ngx-alerts'
import { Network } from '@ngx-pwa/offline'

@Injectable()
export class SharedService {
  constructor(
    private alertService: NgxAlertsService,
    private network: Network
  ) {}

  showError(title, text = '') {
    this.alertService.alertError({ title, text })
  }
  showSucces(title, text = '') {
    this.alertService.alertSuccess({ title, text })
  }
  get networkStatus() {
    return this.network.onlineChanges
  }
  get isOnline() {
    return this.network.online
  }
}

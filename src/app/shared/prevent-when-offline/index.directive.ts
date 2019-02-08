import { Directive, HostListener, ElementRef, OnInit } from '@angular/core'
import { SharedService } from '@core/shared.service'
import { LoadingClickService } from '@shared/loading-when-clicked'

@Directive({ selector: '[app-prevent-offline]' })
export class PreventOfflineDirective implements OnInit {
  constructor(
    private sharedService: SharedService,
    private loading: LoadingClickService
  ) {}
  ngOnInit() {}
  @HostListener('click', ['$event'])
  onClick($event) {
    const isOnline = this.sharedService.isOnline
    if (!isOnline) {
      if ('preventDefault' in $event) {
        $event.preventDefault()
        $event.stopPropagation()
      }
      this.loading.stopLoading('all')
      this.sharedService.showError(
        'Error de conexion',
        'Ups, espera un momento para ejecutar esta acción'
      )
    }
  }
}

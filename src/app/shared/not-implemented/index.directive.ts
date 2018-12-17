import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({ selector: '[app-not-implemented]' })
export class NoImplementedDirective {
  constructor(private el: ElementRef) {}
  @HostListener('click', ['$event'])
  onClick($event) {
    $event.preventDefault()
    alert('Estamos trabajando en esta funcionalidad')
  }
}

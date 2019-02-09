import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit,
  Input
} from '@angular/core'
import { Observable } from 'rxjs/Observable'

export interface DataList {
  isLoaded$: Observable<any>
  isEmpty$: Observable<any>
}

@Component({
  selector: 'app-render-ctrl',
  template: `
    <div class="wrapper-render">
      <div *ngIf="!isEmpty"><ng-content></ng-content></div>
      <div *ngIf="!isLoaded"><h3 class="centered info">Cargando ...</h3></div>
      <div *ngIf="isLoaded">
        <h3 *ngIf="isEmpty" class="centered info">
          No se encontraron resultados
        </h3>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
      .wrapper-render {
        min-height: 40vh;
        height: 100%;
        width: 100%;
        position: relative;
      }
    `
  ]
})
export class OurRenderCtrlComponent implements OnInit, AfterContentInit {
  @Input() height
  @ContentChild('data') dataComponent: DataList

  isLoaded = false
  isEmpty = false
  constructor() {}

  ngOnInit() {}
  ngAfterContentInit() {
    this.dataComponent.isLoaded$.subscribe(loaded => {
      this.isLoaded = loaded
    })
    this.dataComponent.isEmpty$.subscribe(isEmpty => {
      this.isEmpty = isEmpty
    })
  }
}

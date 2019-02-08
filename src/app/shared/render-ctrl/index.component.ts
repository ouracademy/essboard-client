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
      <div *ngIf="!isLoaded">
        <div class="centered info font-md">Cargando ...</div>
      </div>
      <div *ngIf="isLoaded">
        <div *ngIf="isEmpty" class="centered info font-md ">
          No se encontraron resultados
        </div>
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
      console.log('loaded', loaded)
      this.isLoaded = loaded
    })
    this.dataComponent.isEmpty$.subscribe(isEmpty => {
      this.isEmpty = isEmpty
    })
  }
}

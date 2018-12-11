import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit
} from '@angular/core'
import { Observable } from 'rxjs/Observable'

export interface DataList {
  loaded$: Observable<any>
  isEmpty$: Observable<any>
}

@Component({
  selector: 'app-render-ctrl',
  template: `
    <div *ngIf="!isEmpty"><ng-content></ng-content></div>
    <div *ngIf="!loaded" class="wrapper-render">
      <div class="centered info ">Cargando ...</div>
    </div>
    <div *ngIf="isEmpty" class="wrapper-render">
      <div class="centered info ">No se encontraron resultados</div>
    </div>
  `,
  styles: [
    `
      .wrapper-render {
        min-height: 40vh;
        position: relative;
      }
    `
  ]
})
export class OurRenderCtrlComponent implements OnInit, AfterContentInit {
  @ContentChild('data') dataComponent: DataList

  loaded = false
  isEmpty = false
  constructor() {}

  ngOnInit() {}
  ngAfterContentInit() {
    this.dataComponent.loaded$.subscribe(loaded => (this.loaded = true))
    this.dataComponent.isEmpty$.subscribe(isEmpty => (this.isEmpty = isEmpty))
  }
}

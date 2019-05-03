import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output
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
          <div class="section-image" *ngIf="options.image">
            <img class="empty-image" [src]="options.image" />
          </div>
          <br />
          <div class="mat-body-2">
            {{ options.message || 'No se encontraron resultados' }}
            <span class="pad-0-5" *ngIf="options.addButton">
              <button
                mat-stroked-button
                color="accent"
                (click)="addButton.emit()"
              >
                {{ options.addButton.message }}
              </button>
            </span>
          </div>
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
      .empty-image {
        opacity: 0.4;
        max-width: 100%;
        min-width: 50%;
      }
    `
  ]
})
export class OurRenderCtrlComponent implements OnInit, AfterContentInit {
  @Input() height
  @Input() options: { image: string; message: string; addButton: any } = {
    image: null,
    message: null,
    addButton: null
  }
  @ContentChild('data') dataComponent: DataList
  @Output() addButton = new EventEmitter<any>()

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

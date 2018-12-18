import { Injectable } from '@angular/core'
import { EventEmitter } from 'rxjs-event-emitter'
@Injectable()
export class LoadingClickService {
  eventEmitter: EventEmitter = null
  nodesByElement = {}
  constructor() {
    this.eventEmitter = new EventEmitter()
  }
  stopLoading(identifierElementClicked: string): any {
    this.eventEmitter.emit(identifierElementClicked, null)
  }

  get stopLoadingEmitter(): EventEmitter {
    return this.eventEmitter
  }
}

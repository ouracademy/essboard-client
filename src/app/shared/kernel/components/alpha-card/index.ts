import { Component, Input, EventEmitter, Output } from '@angular/core'
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu'
import {
  AlphaTemplate,
  StateTemplate
} from 'app/sessions/components/detail-alpha/kernel'

@Component({
  selector: 'alpha-card',
  templateUrl: 'index.html',
  styleUrls: ['index.css']
})
export class AlphaCardComponent {
  @Input() isReadonly = false
  @Input()
  alpha: AlphaTemplate
  @Input()
  states: any[] = []
  @Output()
  onChooseState = new EventEmitter<StateTemplate>()
  @Input() contextMenu: ContextMenuComponent

  selectedState: StateTemplate = null

  constructor(private contextMenuService: ContextMenuService) {}

  select(template: StateTemplate) {
    if (!this.isReadonly) {
      this.onChooseState.emit(template)
    }
  }

  isSelected(state: StateTemplate) {
    return state === this.selectedState
  }

  getClass(stateTemplate: StateTemplate) {
    const state = this.getState(stateTemplate)
    const status = state ? state.status : 'todo'
    return {
      [status]: true,
      selected: this.isSelected(stateTemplate),
      readonlyButton: this.isReadonly
    }
  }

  getState(stateTemplate: StateTemplate) {
    return this.states.find(x => x.id === stateTemplate.id)
  }
  stop() {
    this.onChooseState.complete()
  }
  public onContextMenu($event: MouseEvent, item: any): void {
    this.contextMenuService.show.next({
      contextMenu: this.contextMenu,
      event: $event,
      item: item
    })
    $event.preventDefault()
    $event.stopPropagation()
  }
}

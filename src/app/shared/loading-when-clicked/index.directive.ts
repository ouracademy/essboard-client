import {
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  OnDestroy,
  Input,
  Directive
} from '@angular/core'
import { LoadingClickService } from './index.service'

@Directive({ selector: '[app-loading-clicked]' })
export class LoadingWhenClickedDirective implements OnInit, OnDestroy {
  @Input() identifierLoading: string
  nativeElement
  loadingChild = null
  children = []
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private loadingService: LoadingClickService
  ) {
    this.nativeElement = this.element.nativeElement
    this.createLoadingElement()
  }
  ngOnInit() {
    const childNodes = Object.assign({}, this.nativeElement.childNodes)
    this.children = Object.keys(childNodes).map(key => childNodes[key])
    this.loadingService.stopLoadingEmitter.on(this.identifierLoading, () => {
      this.stopLoading()
    })
  }
  private createLoadingElement() {
    this.loadingChild = this.renderer.createElement('i')
    this.addClassNames(this.loadingChild, 'fa fa-spinner fa-spin')
  }
  private getLoadingElement() {
    return this.loadingChild
  }

  ngOnDestroy() {}
  @HostListener('click', ['$event'])
  onClick($event) {
    this.startLoading()
  }

  startLoading() {
    this.renderer.addClass(this.nativeElement, 'disabled')
    this.removeOriginalContent()
    this.addLoadingContent()
  }
  stopLoading() {
    this.renderer.removeChild(this.nativeElement, this.loadingChild)
    this.renderer.removeClass(this.nativeElement, 'disabled')
    this.addOriginalContent(this.children)
  }

  private addLoadingContent() {
    this.renderer.appendChild(this.nativeElement, this.getLoadingElement())
  }

  private addClassNames(element, classNames: string = '') {
    classNames.split(' ').forEach(className => {
      this.renderer.addClass(element, className)
    })
  }
  private removeOriginalContent() {
    this.children.forEach(node =>
      this.renderer.removeChild(this.nativeElement, node)
    )
  }
  private addOriginalContent(children) {
    children.forEach(node =>
      this.renderer.appendChild(this.nativeElement, node)
    )
  }
}

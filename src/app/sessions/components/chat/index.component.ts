import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core'
import { Message } from '../../model/messages'
import { ChatService } from '../../services/chat.service'
@Component({
  selector: 'chat',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.scss']
})
export class ChatComponent implements AfterViewInit {
  @Input()
  sessionId
  @Input()
  isReadonly: boolean

  @Output() closeChat = new EventEmitter<any>()

  contentIsVisible = true
  messages: Message[] = []
  message = ''
  skip = 0
  scrollHeight = 0
  canPaginate = true

  @ViewChild('scrollMe')
  private myScrollContainer: ElementRef

  constructor(private chatService: ChatService) {}

  ngAfterViewInit() {
    this.chatService.response$.subscribe(
      ({ data, canPaginate, scrollToBottom, skip }) => {
        this.skip = skip

        setTimeout(() => {
          this.canPaginate = canPaginate
          this.messages = data
          if (scrollToBottom) {
            this.scrollHeight = this.myScrollContainer.nativeElement.scrollHeight
          } else {
            this.scrollHeight = null
          }
        }, 10)
      }
    )
  }

  onScroll(event) {
    if (event.target.scrollTop === 0 && this.canPaginate) {
      this.chatService.query = { sessionId: this.sessionId, skip: this.skip }
    }
  }

  toggleContent() {
    this.contentIsVisible = !this.contentIsVisible
  }

  close() {
    this.closeChat.emit()
  }

  save() {
    const text = this.message.trim()

    if (text.length > 0) {
      this.chatService.addMessage(text, this.sessionId)
      this.message = ''
    }
  }

  get placeholder() {
    return this.isReadonly
      ? 'Este chat esta en modo lectura. Le puede servir como auditoria.'
      : 'Escriba aqui su mensaje'
  }
}

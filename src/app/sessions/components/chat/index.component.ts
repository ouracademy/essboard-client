import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core'
import { ChatService } from '../../services/chat.service'
import { Message } from '../../model/messages'
@Component({
  selector: 'chat',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChatComponent implements AfterViewInit {
  @Input()
  sessionId
  @Input()
  isReadonly: boolean

  show = true
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

  showWindow() {
    this.show = !this.show
  }

  save() {
    this.chatService.addMessage(this.message, this.sessionId)
    this.message = ''
  }

  get placeholder() {
    return this.isReadonly
      ? 'Este chat esta en modo lectura. Le puede servir como auditoria.'
      : 'Escriba aqui su mensaje'
  }
}

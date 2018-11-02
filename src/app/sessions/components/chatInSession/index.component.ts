import {
  Component,
  Input,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core'
import { ChatService } from '../../services/chat.service'
import { Message } from '../../model/messages'
@Component({
  selector: 'chat',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @Input()
  sessionId

  show = false
  messages: Message[] = []
  message = ''

  @ViewChild('scrollMe')
  private myScrollContainer: ElementRef

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe(messages => {
      this.messages = messages
    })
    this.chatService.getMessages(this.sessionId)
    this.scrollToBottom()
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
    } catch (err) {}
  }

  showWindow() {
    this.show = !this.show
  }

  save() {
    this.chatService.addMessage(this.message, this.sessionId)
    this.message = ''
  }
}

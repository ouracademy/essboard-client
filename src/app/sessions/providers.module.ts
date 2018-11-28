import { SessionService } from './services/session.service'
import { SessionSocketService } from './services/session-socket.service'
import { ChatService } from './services/chat.service'
import { ChatSocketService } from './services/chat-socket.service'
import { GoalService } from './services/goal.service'
import { GoalSocketService } from './services/goal-socket.service'
import { ChannelService } from './services/channel.service'
export const PROVIDERS_SESSION = [
  { provide: SessionService, useClass: SessionSocketService },
  { provide: ChatService, useClass: ChatSocketService },
  { provide: GoalService, useClass: GoalSocketService },
  ChannelService
]

import { SessionService } from './services/session.service'
import { SessionSocketService } from './services/session-socket.service'

import { GoalService } from './services/goal.service'
import { GoalSocketService } from './services/goal-socket.service'
import { ChannelService } from './services/channel.service'
export const PROVIDERS_SESSION = [
  { provide: SessionService, useClass: SessionSocketService },
  { provide: GoalService, useClass: GoalSocketService },
  ChannelService
]

import { SessionService } from './services/session.service'
import { SessionSocketService } from './services/session-socket.service'
import { DialogService } from './services/dialog.service'
import { DialogSocketService } from './services/dialog-socket.service'
import { GoalService } from './services/goal.service'
import { GoalSocketService } from './services/goal-socket.service'

export const PROVIDERS_SESSION = [
  { provide: SessionService, useClass: SessionSocketService },
  { provide: DialogService, useClass: DialogSocketService },
  { provide: GoalService, useClass: GoalSocketService }
]

import { ProjectService } from './services/project.service'
import { ProjectSocketService } from './services/project-socket.service'

import { ProjectsService } from './services/projects.service'
import { ProjectsSocketService } from './services/projects-socket.service'

export const PROVIDERS_PROJECT = [
  { provide: ProjectService, useClass: ProjectSocketService },
  { provide: ProjectsService, useClass: ProjectsSocketService }
]

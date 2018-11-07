import { Subject } from 'rxjs'

export abstract class ProjectService {
  currentProject$: Subject<any>
  projectMembers$: Subject<any>
  abstract setName(name: string)
  abstract setDescription(description: string)
  abstract getProject(id: string)
  abstract delete()
  abstract inviteTo(project, user)
  abstract desinviteTo(user)
  abstract getMembers(id)
}

import { BehaviorSubject, Observable } from 'rxjs'
import { Member } from 'app/members/members.service'
import { Project } from '@shared/models/project'

export abstract class ProjectService {
  currentProject$: BehaviorSubject<Project>
  members$: Observable<Member[]>

  abstract showShareProject()
  abstract set selectedProject(projectId: string)
  abstract delete()
  abstract invite(aUser): Promise<any>
  abstract remove(aMember: Member): Promise<any>

  abstract setName(name: string)
  abstract setDescription(description: string)
}

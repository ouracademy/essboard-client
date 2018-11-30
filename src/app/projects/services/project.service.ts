import { Subject } from 'rxjs'
import { Member } from 'app/members/members.service'

export abstract class ProjectService {
  currentProject$: Subject<any>
  abstract setName(name: string)
  abstract setDescription(description: string)
  abstract getProject(id: string)
  abstract delete()

  abstract invite(aUser): Promise<any>
  abstract remove(aMember: Member): Promise<any>
}

import { Project } from '@models/project'
import { Subject } from 'rxjs'

export abstract class ProjectsService {
  items$: Subject<any>
  abstract getProjects()
  abstract add(name: string, description: string)
}

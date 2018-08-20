
import { Project } from '../../../shared/models/project';
import { Observable } from 'rxjs';

export abstract class ProjectsService {
    items: Observable<any>;
    abstract getProjects() ;
    abstract add(project: Project);
}
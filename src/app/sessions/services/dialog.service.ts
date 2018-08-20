import { Observable } from 'rxjs';


export abstract class DialogService {
    items: Observable<any>;
    abstract getComments(sessionId);
    abstract add(text,sessionId);
}
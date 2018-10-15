import { Subject } from 'rxjs';


export abstract class DialogService {
    comments$: Subject<any>;
    abstract getComments(sessionId);
    abstract add(text,sessionId);
}
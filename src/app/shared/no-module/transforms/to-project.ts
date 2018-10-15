import { Project,Session } from '../models/project';
import { ToSession } from './to-session';

export class ToProject {
    public static transformCompleteToProject(obj: any) {
        let p = new Project(obj._id, obj.name, obj.description, obj.createdBy, obj.createdAt);
        for (let session of obj.sessions) {
            p.addSession(this.transformSourceToSession(session));
        }
        p.lastSession = ToSession.withCompleteTransformation(obj.lastSession);
        for (let member of obj.members) {
            p.addMember(member._id, member.email, member.avatar);
        }
        return p;
    }

    public static transformSourceToSession(obj: any) {
        return new Session(obj._id, obj.nroOrder, obj.createdAt)
    }
}

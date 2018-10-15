
import { Session } from '../models/project';
import { BuilderKernel } from '../util/build-kernel';
export class ToSession {
    public static withCompleteTransformation(source: any) {
        if (source) {
            let session = new Session(source._id, source.nroOrder, source.createdAt);
            session.projectId = source._project;
            let kernel = BuilderKernel.build(source.alphas);
            session.kernel = kernel;
            return session;
        }
        return null;
    }

}
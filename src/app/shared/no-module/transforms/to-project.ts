import { Project, Session } from '../models/project'

export class ToProject {
  public static transformCompleteToProject(obj: any) {
    let p = new Project(
      obj._id,
      obj.name,
      obj.description,
      obj.createdBy,
      obj.createdAt
    )
  }

  public static transformSourceToSession(obj: any) {
    return new Session(obj._id, obj.createdAt, obj.createdAt)
  }
}

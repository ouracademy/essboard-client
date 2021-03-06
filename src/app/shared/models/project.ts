import { User } from '@models/user'

export class Project {
  public members: any[] = []
  public sessions: Session[] = []

  public lastSession: Session

  constructor(
    public id: string,
    public name: string,
    public description: string,
    private ownerId: string,
    public createdAt: Date,
    public progressPercent = 0
  ) {}

  isOwner(user: User): boolean {
    return this.ownerId === user.id
  }

  addSession(session: Session): void {
    this.sessions.push(session)
  }

  addMember(id, email, avatar) {
    this.members.push({
      id: id,
      email: email,
      avatar: avatar
    })
  }
  haveThisMember(member): boolean {
    const index = this.members
      .map(function(item) {
        return item.email
      })
      .indexOf(member.email)
    return index !== -1
  }

  getLastSession() {
    return this.sessions.length > 0 ? this.sessions[0] : null
  }

  getLastSessionId() {
    if (this.sessions.length > 0) {
      return this.sessions[this.sessions.length - 1].id
    }
    return null
  }

  canCreateNewSession() {
    return this.sessions.length === 0 || this.getLastSession().hasFinished
  }
}

export class Session {
  public kernel

  constructor(
    public id: string,
    public createdAt: Date,
    public endDate: Date,
    public projectId: string
  ) {}

  public get hasFinished(): boolean {
    return !!this.endDate
  }

  getDimension(alpha) {
    return null
  }
}

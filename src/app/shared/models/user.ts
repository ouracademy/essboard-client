import { Member } from 'app/members/members.service'
export class Credentials {
  constructor(public email: string, public password: string) {}
}

export class User {
  public password: string

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date,
    public appKeyTrello?: string
  ) {}
  isMember(members: Member[]): boolean {
    return !!members.find(x => x.email === this.email)
  }
}

import { Member } from 'app/members/members.service'

export class User {
  public password: string

  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date,
    public appKeyTrello?: string
  ) {}

  public avatar(size = 400): string {
    return `https://api.adorable.io/avatars/${size}/${this.name}`
  }

  isMember(members: Member[]): boolean {
    return !!members.find(x => x.email === this.email)
  }
}

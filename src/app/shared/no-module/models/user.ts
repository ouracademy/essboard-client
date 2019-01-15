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

  public avatar(size = 400): string {
    return `https://api.adorable.io/avatars/${size}/${this.name}`
  }
}

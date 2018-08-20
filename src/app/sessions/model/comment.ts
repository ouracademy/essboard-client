
export class Comment {
  public text: string;
  public userName: string;
  public userAvatar: string;

  constructor(text: string, userName: string) {
    this.text = text;
    this.userName = userName;
    this.userAvatar =  `https://api.adorable.io/avatars/25/${userName}`;
  }
}
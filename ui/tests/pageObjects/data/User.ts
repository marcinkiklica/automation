export class User {
  username: string;
  login: string;
  password: string;

  constructor(username: string, login: string, password: string) {
    this.username = username;
    this.login = login;
    this.password = password;
  }  
}
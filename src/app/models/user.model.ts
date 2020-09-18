export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: boolean,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public id?: string
  ) {}
}

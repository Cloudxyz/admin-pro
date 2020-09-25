import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public uid?: string,
    public active?: boolean
  ) {}

  get imageUrl() {
    if (!this.img) {
      return `${base_url}/upload/users/no-img`;
    } else if (this.google) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-img`;
    }
  }
}

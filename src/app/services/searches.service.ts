import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      (user) =>
        new User(
          user.name,
          user.email,
          '',
          user.google,
          user.img,
          user.role,
          user.uid,
          user.active
        )
    );
  }

  search(type: 'users' | 'hospitals' | 'doctors', term: string) {
    return this.http
      .get<any[]>(`${base_url}/search/${type}/${term}`, this.headers)
      .pipe(
        map((res: any) => {
          switch (type) {
            case 'users':
              return this.transformUsers(res.results);
            default:
              return [];
          }
        })
      );
  }
}

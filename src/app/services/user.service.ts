import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../auth/interfaces/login.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: environment.google_id,
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((res: any) => {
        const { email, google, name, role, img = '', uid } = res.user;
        this.user = new User(name, email, '', google, img, role, uid);
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.user.role,
    };
    return this.http.put(
      `${base_url}/users/update/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      map((res: any) => {
        if (formData.remember) {
          localStorage.setItem('email', formData.email);
        } else {
          localStorage.removeItem('email');
        }
        localStorage.setItem('token', res.token);

        return true;
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.token);

        return true;
      })
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users/create`, formData);
  }

  getUsers(from: number = 0) {
    return this.http
      .get<any>(`${base_url}/users?from=${from}`, this.headers)
      .pipe(
        map((res) => {
          const users = res.users.map(
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

          return {
            total: res.total,
            users,
          };
        })
      );
  }

  delete(uid: string) {
    return this.http.delete(`${base_url}/users/delete/${uid}`, this.headers);
  }

  updateUser(user: User) {
    return this.http.put(
      `${base_url}/users/update/${user.uid}`,
      user,
      this.headers
    );
  }
}

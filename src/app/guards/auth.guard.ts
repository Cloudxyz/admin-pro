import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private route: Router) {}

  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]
  ):
    | boolean
    | import('@angular/router').UrlTree
    | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    return this.userService.validateToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.route.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.validateToken().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.route.navigateByUrl('/login');
        }
      })
    );
  }
}

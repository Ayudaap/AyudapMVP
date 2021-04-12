import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService, private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {  
    return this.auth.isAuth();
  }
  
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.isAuth()
      .pipe(
        tap(estado => {
          if (!estado) { this.router.navigate(['/auth']) }
        }),
        take(1)
      );
  }
}

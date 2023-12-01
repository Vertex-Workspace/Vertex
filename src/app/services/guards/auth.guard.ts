import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { UserStateService } from '../user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(
    private router : Router,
    private userState: UserStateService
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    

    return this.userState.getAuthenticationStatus()
      .pipe(
        take(1),
        map(logged => {
          if (logged) {
            return true;
          }
          
          this.router.navigate(['/login']);
          return false;
        })
      );
    
  }
  
}

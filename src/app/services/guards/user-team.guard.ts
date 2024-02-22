import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserTeamGuard implements CanActivate {

  logged !: User;
  team !: Team;

  constructor(
    
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}

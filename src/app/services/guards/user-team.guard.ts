import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { TeamService } from '../team.service';
import { UserStateService } from '../user-state.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserTeamGuard implements CanActivate {

  logged !: User;
  team !: Team;

  constructor(
    private userState: UserStateService,
    private userService: UserService,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}

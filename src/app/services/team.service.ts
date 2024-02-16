import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/team';
import { HasPermission, Permission, User } from '../models/user';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${URL}team`)
      .pipe(map((teams: Team[]) => teams.map(team => new Team(team))));
  } 

  public getOneById(id: number): Observable<Team> {
    return this.http
      .get<Team>(`${URL}team/${id}`)
      .pipe(map((team: Team) => new Team(team)));
  }

  public create(team: Team): Observable<Team> {
    return this.http
      .post<Team>(`${URL}team`, team);
  }

  public delete(id: number): Observable<Team> {
    return this.http
      .delete<Team>(`${URL}team/${id}`);
  }

  public getTeamsByUser(userId: number): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${URL}user-team/teams/${userId}`)
      .pipe(map((teams: Team[]) => teams.map(team => new Team(team))));

  }

  public existsByIdAndUserBelongs(teamId: number, userId: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${URL}team/exists/${teamId}/${userId}`);
  }

  public getPermission(team: Team, user: User): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${URL}team/permission/${user.id}/${team.id}`)
  }

  // public hasPermission():

  public changePermissionEnable(permission: Permission, user: User, team: Team):Observable<Permission>{
    return this.http.patch<Permission>(`${URL}team/permission/${permission.id}/${user.id}/${team.id}`, permission)
  }

  public hasPermission(project: Project, user: User): Observable<Permission[]> {
    return this.http
      .get<Permission[]>(`${URL}team/hasPermission/${project.id}/${user.id}`)
      .pipe(map((permissions: Permission[]) => permissions.map(permission => new Permission(permission))));
  }
}

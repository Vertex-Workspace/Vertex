import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Group } from '../models/class/groups';
import { User } from '../models/class/user';
import { Team } from '../models/class/team';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private http: HttpClient
  ) { }

  public create(group: Group): Observable<Group> {  
    return this.http
      .patch<Group>(`${URL}team/group`, group, {withCredentials: true});
  }

  public getGroupsByTeam(teamID: any): Observable<Group[]> {
    return this.http
      .get<Group[]>(`${URL}team/${teamID}/groups`, {withCredentials: true});
  }

  public getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${URL}group/${groupId}`, {withCredentials: true});
  }

  public delete(group: Group):Observable<Group> {
    return this.http.delete<Group>(`${URL}team/group/${group.id}`, {withCredentials: true});
  }

  public deleteUserFromGroup(user: User, teamId:number, groupId:number):Observable<Group>{
    return this.http.delete<Group>(`${URL}team/${teamId}/group/${groupId}/user/${user.id}`, {withCredentials: true});
  }

  public getUsersOutOfGroup(team: Team, group: Group): Observable<User[]>{
    return this.http.get<User[]>(`${URL}team/${team.id}/group/${group.id}`, {withCredentials: true});
  }

  public addParticipants(group: Group, userId: number): Observable<Group>{
    return this.http.patch<Group>(`${URL}team/group/${group.id}/addParticipants/${userId}`, group, {withCredentials: true});
  }

  public edit(group: Group, teamId: number):Observable<Group>{
    return this.http.patch<Group>(`${URL}group/edit/${teamId}`, group, {withCredentials: true});
  }

}

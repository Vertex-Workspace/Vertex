import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Group } from '../models/groups';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private http: HttpClient
  ) { }

  public create(group: Group): Observable<Group> {  
    return this.http
      .patch<Group>(`${URL}team/group`, group);
  }

  public getGroupsByTeam(teamID: number): Observable<Group[]> {
    return this.http
      .get<Group[]>(`${URL}usersByTeam/${teamID}`)
      .pipe(map((groups: Group[]) =>
        groups.map(group => new Group(group))
      )
      )
  }

  public getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${URL}group/${groupId}`);
  }

  public delete(groupId: number):Observable<Group> {
    return this.http.delete<Group>(`${URL}team/group/${groupId}`)
  }

  public deleteUserFromGroup(user: User, teamId:number, groupId:number):Observable<Group>{
    return this.http.delete<Group>(`${URL}team/${teamId}/group/${groupId}/user/${user.id}`)
  }

}

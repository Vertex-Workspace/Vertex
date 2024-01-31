import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Group } from '../models/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private http: HttpClient
  ) { }

  public create(group: Group): Observable<Group> {
    console.log(group);
    
    return this.http
      .patch<Group>(`${URL}team/group`, group);
  }

  public getGroupsByTeam(teamID: number): Observable<Group[]> {
    return this.http
      .get<Group[]>(`${URL}team/${teamID}/groups`)
      .pipe(map((groups: Group[]) =>
        groups.map(group => new Group(group))
      )
      )
  }

  public getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(`${URL}group/${groupId}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { URL } from './path/api_url';
import { Team } from '../models/team';

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


}
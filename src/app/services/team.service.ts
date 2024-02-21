import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/team';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject: BehaviorSubject<Team[]> = 
    new BehaviorSubject<Team[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  public getAllTeams(): Observable<Team[]> {
    return this.teamsSubject
      .asObservable();
  } 

  public getOneById(id: number): Observable<Team> {
    return this.http
      .get<Team>(`${URL}team/${id}`)
      .pipe(map((team: Team) => new Team(team)));
  }

  public create(team: Team): Observable<Team> {
    return this.http
      .post<Team>(`${URL}team`, team)
      .pipe(tap((createdTeam: Team) => {
        const currentTeams = this.teamsSubject.getValue();
        this.teamsSubject.next([
          ...currentTeams,
          createdTeam
        ])
      }));
  }

  public delete(id: number): Observable<Team> {
    return this.http
      .delete<Team>(`${URL}team/${id}`)
        .pipe(tap(() => {
          const currentTeams: Team[] = this.teamsSubject.getValue();
          const updatedTeams: Team[] = currentTeams.filter((team: Team) => {
            team.id !== id;
          })
          this.teamsSubject.next(updatedTeams);
        }));
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

  public updateImage(teamId: number, fd: FormData) {
    return this.http
      .patch(`${URL}team/image/${teamId}`, fd)
  }


}

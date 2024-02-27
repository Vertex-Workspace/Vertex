import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Chat } from '../models/chat';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsSubject: BehaviorSubject<Team[]> =
    new BehaviorSubject<Team[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  public getAllTeams(): Observable<Team[]> {
    return this.teamsSubject
      .asObservable();
  }

  public getOneById(id: number): Observable<Team> {
    return this.http
      .get<Team>(`${URL}team/${id}`)
      .pipe(map((team: Team) => new Team(team)));
  }

  public addUserOnTeam(userId: number, teamId: number): Observable<any> {

    let userTeam = {
      team: {
        id: teamId
      },
      user:{
        id: userId
      } 
    }

    return this.http
      .patch<Team>(`${URL}team/user`, userTeam);
      
  }

  public findAllChats():Observable<Chat[]>{
    return this.http.get<Chat[]>(`${URL}chatController`);
  }

  public findAllMessagesByChatId(idChat:number):Observable<Message[]>{
    return this.http.get<Message[]>(`${URL}chatController/messagesByChatId/${idChat}`);
  }

  public patchMessagesOnChat(idChat:number,idUser:number, message:Message):Observable<any>{
    console.log(idChat)
    console.log(idUser);
    
    
    return this.http.patch<any>(`${URL}chatController/messagePatch/${idChat}/${idUser}`, message);
  }

  public patchChat(idChat:number, teamId: number, userId:number):Observable<any>{
    console.log(idChat)
    let userTeam = {
      team: {
        id: teamId
      },
      user:{
        id: userId
      } 
    }
    console.log(userTeam);
    
    return this.http.patch<any>(`${URL}chatController/chat/${idChat}`, userTeam);
  }

  public userIsOnTeam(userId: number, teamId: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${URL}team/userIsOnTeam/${userId}/${teamId}`);
  }

  public getInvitationCodeById(id: number) {
    return this.http
      .get<string>(`${URL}team/invitation/${id}`);
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



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, throwError  } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/class/team';
import { HasPermission, Permission, User } from '../models/class/user';
import { Project } from '../models/class/project';
import { Chat } from '../models/class/chat';
import { Message } from '../models/class/message';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }

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
  public updateImage(teamId: number, fd: FormData) {

    console.log(teamId);
    
    return this.http
      .patch(`${URL}team/image/${teamId}`, fd)
  }

  public changePermissionEnable(permission: Permission, user: User, team: Team): Observable<Permission> {
    return this.http.patch<Permission>(`${URL}team/permission/${permission.id}/${user.id}/${team.id}`, permission)      
  }

  public hasPermission(projectId: number, user: User): Observable<Permission[]> {
    return this.http
      .get<Permission[]>(`${URL}team/hasPermission/${projectId}/${user.id}`)
      .pipe(map((permissions: Permission[]) => permissions.map(permission => new Permission(permission))));
  }

  public deleteUserTeam(team: Team, user: User): Observable<Team> {
    return this.http.delete<Team>(`${URL}team/user-team/${team.id}/${user.id}`)
  }

  public getTeamCreator(team: Team): Observable<Team> {
    return this.http.get<Team>(`${URL}team/${team.id}/creator`)
  }
}

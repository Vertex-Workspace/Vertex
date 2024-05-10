import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap, throwError  } from 'rxjs';
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
      .get<Team>(`${URL}team/${id}`, {withCredentials: true});
  }

  public getScreenInformationsById(id: number): Observable<Team> {
    return this.http
      .get<Team>(`${URL}team/screen/${id}`, {withCredentials: true});
  }

  public getTeamName(id: number): Observable<any> {
    return this.http
      .get<any>(`${URL}team/name/${id}`, {withCredentials: true});
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
      .patch<Team>(`${URL}team/user`, userTeam, {withCredentials: true});
      
  }

  public findInformationInvitationPage(id: number) : Observable<Team>{
    return this.http
      .get<Team>(`${URL}team/invitation-page-info/${id}`, {withCredentials: true});
    
  }

  public findAllChatsByUser(id:number):Observable<Chat[]>{
    return this.http.get<Chat[]>(`${URL}chatController/allChatsOfUser/${id}`, {withCredentials: true});
  }

  public findAllMessagesByChatId(idChat:number):Observable<Message[]>{
    return this.http.get<Message[]>(`${URL}chatController/messagesByChatId/${idChat}`, {withCredentials: true});
  }

  public patchMessagesOnChat(idChat:number,idUser:number, message:Message):Observable<any>{
    return this.http.patch<any>(`${URL}chatController/messagePatch/${idChat}/${idUser}`, message, {withCredentials: true});
  }
  
  public patchArchiveOnChat(idChat:number, file:FormData):Observable<any>{
    return this.http.patch<any>(`${URL}chatController/patchFile/${idChat}`, file, {withCredentials: true});
  }

  public patchChat(idChat:number, teamId: number, userId:number):Observable<any>{
    const userTeam = {team: {id: teamId},user:{id: userId}}
    return this.http.patch<any>(`${URL}chatController/chat/${idChat}`, userTeam, {withCredentials: true});
  }

  public userIsOnTeam(userId: number, teamId: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${URL}team/userIsOnTeam/${userId}/${teamId}`, {withCredentials: true});
  }

  public getInvitationCodeById(id: number) {
    return this.http
      .get<string>(`${URL}team/invitation/${id}`, {withCredentials: true});
  }

  public create(team: Team): Observable<Team> {
    return this.http
      .post<Team>(`${URL}team`, team, {withCredentials: true});
  }

  public delete(id: number): Observable<Team> {
    return this.http
      .delete<Team>(`${URL}team/${id}`, {withCredentials: true});
  }

  public getTeamsByUser(user: User): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${URL}user-team/teams/${user.id}`, {withCredentials: true});

  }


  public getPermission(teamId: number, userId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${URL}team/permission/${userId}/${teamId}`, {withCredentials: true})
  }

  public updateImage(teamId: number, fd: FormData) {
    return this.http
      .patch<Team>(`${URL}team/image/${teamId}`, fd, {withCredentials: true})
  }
  
  public updateTeam(team : Team): Observable<Team>{
    return this.http
      .put<Team>(`${URL}team`, team, {withCredentials: true});
  }

  public changePermissionEnable(permission: Permission): Observable<Permission> {
    return this.http.patch<Permission>(`${URL}team/permission/${permission.id}`, permission , {withCredentials: true})      
  }


  public deleteUserTeam(team: Team, user: User): Observable<Team> {
    return this.http.delete<Team>(`${URL}team/${team.id}/${user.id}`, {withCredentials: true})
  }

  public getTeamCreator(team: Team): Observable<User> {
    return this.http.get<User>(`${URL}team/${team.id}/creator`, {withCredentials: true})
  }

  public getUsers(teamId: any): Observable<User[]> {
    return this.http
      .get<User[]>(`${URL}team/users/${teamId}`, {withCredentials: true});
  }


}

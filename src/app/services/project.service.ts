import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Project, ProjectCollaborators, ProjectEdit } from '../models/class/project';
import { URL } from './path/api_url';
import { Task } from '../models/class/task';
import { Property } from '../models/class/property';
import { Team } from '../models/class/team';
import { User } from '../models/class/user';
import { Group } from '../models/class/groups';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }


  public getOneById(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${URL}project/${id}`, {withCredentials: true});
  }

  public create(project: Project, teamId: number): Observable<Project> {
    console.log(project);
    
    return this.http
      .post<Project>(`${URL}project/${teamId}`, project, {withCredentials: true});
  }

  public delete(id: number) {
    return this.http
      .delete(`${URL}project/${id}`, {withCredentials: true});
  }

  public getAllByTeam(id: number): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${URL}project/team/${id}`, {withCredentials: true})
  }

  public getTasksByProject(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}project/${id}/tasks`, {withCredentials: true})
  }

  public updateImage(teamId: number, fd: FormData): Observable<Project>{
    return this.http
      .patch<Project>(`${URL}project/image/${teamId}`, fd, {withCredentials: true})
  }

  public getProjectByCollaborators(team: number, user: User): Observable<Project[]> {
    return this.http.get<Project[]>(`${URL}project/${team}/${user.id}`, {withCredentials: true});
  }

  public patchValue(project: ProjectEdit):Observable<Project>{
    return this.http.patch<Project>(`${URL}project/update`, project, {withCredentials: true});
  }

  public returnAllCollaborators(id: number): Observable<ProjectCollaborators> {
    return this.http
      .get<ProjectCollaborators>(`${URL}project/getAll/${id}`, {withCredentials: true});
  }

}

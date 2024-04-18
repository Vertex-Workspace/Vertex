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


  public getOneById(id: number, userID: number): Observable<Project> {
    return this.http
      .get<Project>(`${URL}project/${id}/user/${userID}`);
  }

  public create(project: Project, teamId: number): Observable<Project> {
    console.log(project);
    
    return this.http
      .post<Project>(`${URL}project/${teamId}`, project);
  }

  public delete(id: number) {
    return this.http
      .delete(`${URL}project/${id}`);
  }

  public getAllByTeam(id: number): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${URL}project/team/${id}`)
  }

  public existsById(id: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${URL}project/exists/${id}`)
  }

  public getTasksByProject(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}project/${id}/tasks`)
  }

  public updateImage(teamId: number, fd: FormData): Observable<Project>{
    return this.http
      .patch<Project>(`${URL}project/image/${teamId}`, fd)
  }

  public getProjectByCollaborators(team: number, user: User): Observable<Project[]> {
    return this.http.get<Project[]>(`${URL}project/${team}/${user.id}`);
  }

  public patchValue(project: ProjectEdit):Observable<Project>{
    return this.http.patch<Project>(`${URL}project/update`, project);
  }

  public returnAllCollaborators(id: number): Observable<ProjectCollaborators> {
    return this.http
      .get<ProjectCollaborators>(`${URL}project/getAll/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Project, ProjectEdit } from '../models/class/project';
import { URL } from './path/api_url';
import { Task } from '../models/class/task';
import { Property } from '../models/class/property';
import { Team } from '../models/class/team';
import { User } from '../models/class/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${URL}project`)
      .pipe(map((projects: Project[]) =>
        projects.map(project => new Project(project))
      )
      )
  };

  public getOneById(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${URL}project/${id}`);
  }

  public create(project: Project, teamId: number): Observable<Project> {
    console.log(project);

    return this.http
      .post<Project>(`${URL}project/${teamId}`, project);
  }

  public delete(id: number): Observable<Project> {
    return this.http
      .delete<Project>(`${URL}project/${id}`);
  }

  public getAllByTeam(id: number): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${URL}project/team/${id}`)
      .pipe(map((projects: Project[]) =>
        projects.map(project => new Project(project))
      )
      )
  }

  public existsById(id: number): Observable<boolean> {
    return this.http
      .get<boolean>(`${URL}project/exists/${id}`)
  }
  public getTasksByProject(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}project/${id}/tasks`)
      .pipe(map((tasks: Task[]) =>
        tasks.map(task => new Task(task))
      )
      )
  }

  public updateImage(teamId: number, fd: FormData) {
    return this.http
      .patch(`${URL}project/image/${teamId}`, fd)
  }

  public getProjectByCollaborators(team: number, user: User): Observable<Project[]> {
    return this.http.get<Project[]>(`${URL}project/${team}/${user.id}`)
      .pipe(map((projects: Project[]) =>
        projects.map(project => new Project(project))
      )
      )
  }

  public getProjectCollaborators(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(`${URL}project/users/${projectId}`)
    .pipe(map((users: User[]) =>
      users.map(user => new User(user))
    )
    ) 
  }

  public patchValue(project: ProjectEdit):Observable<Project>{
    console.log(project);
    
    return this.http.patch<Project>(`${URL}project/update`, project);
  }

}

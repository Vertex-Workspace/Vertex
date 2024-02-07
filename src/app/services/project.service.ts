import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Project } from '../models/project';
import { URL } from './path/api_url';
import { Task } from '../models/task';
import { Property } from '../models/property';

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
  }

  public getOneById(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${URL}project/${id}`)
      .pipe(map((project: Project) => new Project(project)));
  }

  public create(project: Project, teamId: number): Observable<Project> {
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



  //Properties

  public createProperty(projectID:number, property : Property): Observable<Property> {
    console.log(projectID);
    console.log(property);
    return this.http.patch<Property>(`${URL}project/${projectID}/property`, property);
  }

  public deleteProperty(projectID:number, propertyId : number): Observable<Property> {
    return this.http.delete<Property>(`${URL}project/${projectID}/${propertyId}`, {});
  }
}

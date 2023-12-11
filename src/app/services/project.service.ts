import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project';
import { URL } from './path/api_url';

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

}

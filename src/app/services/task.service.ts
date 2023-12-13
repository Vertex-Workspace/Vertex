import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/team';
import { Task, TaskCreate, TaskEdit } from '../models/task';
import { Value, ValueUpdate } from '../models/value';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}task`)
      .pipe(map((teams: Task[]) => teams.map(team => new Task(team))));
  } 

  public getOneById(id: number): Observable<Team> {
    return this.http
      .get<Team>(`${URL}team/${id}`)
      .pipe(map((team: Team) => new Team(team)));
  }

  public edit(taskEdit: TaskEdit): Observable<Task> {
    return this.http.patch<Task>(`${URL}task`, taskEdit);
  }

  public create(taskCreate: TaskCreate): Observable<Task> {
    return this.http.post<Task>(`${URL}task`, taskCreate);
  }

  public delete(id: number): Observable<Task> {
    return this.http
      .delete<Task>(`${URL}task/${id}`);
  }


  public patchValue(valueUpdate: ValueUpdate):Observable<Task>{
    return this.http.patch<Task>(`${URL}task/value`, valueUpdate);
  }


}

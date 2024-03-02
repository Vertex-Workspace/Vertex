import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/team';
import { Task, TaskCreate, TaskEdit } from '../models/task';
import { Value, ValueUpdate } from '../models/value';
import { Comment, CommentSend } from '../models/comment';

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

  public getAllByProject(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}task/project/${id}`)
      .pipe(map((tasks: Task[]) => tasks.map(task => new Task(task))));
  }

  public getAllByTeam(id: number):Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}task/team/${id}`)
      .pipe(map((tasks: Task[]) => tasks.map(task => new Task(task))));
  }

  public getAllByUser(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}task/user/${id}`)
      .pipe(map((tasks: Task[]) => tasks.map(task => new Task(task))));
  }



  public saveComment(comment: CommentSend): Observable<Task> {
    console.log(comment);
    
    return this.http.patch<Task>(`${URL}task/comment`, comment);
  }


}

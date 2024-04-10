import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL } from './path/api_url';
import { Team } from '../models/class/team';
import { ReturnTaskResponsables, Task, TaskCreate, TaskEdit, TaskWaitingToReview, UpdateResponsibles } from '../models/class/task';
import { Value, ValueUpdate } from '../models/class/value';
import { CommentSend } from '../models/class/comment';
import { Chat } from '../models/class/chat';
import { Permission, User } from '../models/class/user';
import { Group } from '../models/class/groups';

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
    console.log(taskCreate);
    
    return this.http.post<Task>(`${URL}task`, taskCreate);
  }

  public delete(id: number) {
    return this.http
      .delete(`${URL}task/${id}`);
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
      .get<Task[]>(`${URL}team/tasks/${id}`)
  }

  public getAllByUser(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}task/user/${id}`)
  }

  public getTaskPermissions(taskID: number, userID: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${URL}task/${taskID}/task-permission/${userID}`);
  }


  public saveComment(comment: CommentSend): Observable<Task> {
    return this.http.patch<Task>(`${URL}task/comment`, comment);
  }

  public deleteComment(taskID: number, commentID: number): Observable<Task> {
    return this.http.delete<Task>(`${URL}task/${taskID}/comment/${commentID}`);
  }

  public createChatByTaskId(taskID: number): Observable<Task> {
    return this.http.post<Task>(`${URL}task/${taskID}/chat`, {});
  }

  public getChatByTaskId(taskID: number): Observable<Chat> {
    return this.http.get<Chat>(`${URL}task/${taskID}/chat`);
  }

  public getTaskInfo(taskId: number) {
    return this.http.get(`${URL}task/info/${taskId}`);
  }

  public getTasksToReview(userID: number, projectID:number): Observable<TaskWaitingToReview[]>{
    return this.http.get<TaskWaitingToReview[]>(`${URL}task/review/${userID}/project/${projectID}`);
  }

  public getPerformanceInTask(taskID:number): Observable<any>{
    return this.http.get(`${URL}task/${taskID}/review/performance`);
  }

  public uploadFile(fd: FormData, id: number, userID : number): Observable<Task> {
    return this.http
      .patch<Task>(`${URL}task/${id}/upload/${userID}`, fd);
  }

  public removeFile(taskId: number, fileId: number): Observable<Task> {
    return this.http
      .delete<Task>(`${URL}task/${taskId}/remove-file/${fileId}`)
  }

  public returnAllResponsables(id: number): Observable<ReturnTaskResponsables> {
    return this.http
      .get<ReturnTaskResponsables>(`${URL}task/taskResponsables/${id}`);
  }

  public updateTaskResponsables(updateResponsible: UpdateResponsibles): Observable<Task> {
    return this.http.patch<Task>(`${URL}task/taskResponsables`, updateResponsible);
  }

  public getGroupByTask(taskId: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${URL}task/groups/${taskId}`)
    .pipe(map((groups: Group[]) => groups.map(group => new Group(group))));
  }

  public taskDependency(taskId: number, taskDependencyId: number, task: Task): Observable<Task> {
    return this.http.patch<Task>(`${URL}task/taskDependency/${taskId}/${taskDependencyId}`, task);
  }

  public setTaskDependencyNull(taskId: number, task: Task): Observable<Task>{
    return this.http.patch<Task>(`${URL}task/taskDependency/${taskId}`, task);
  }

}

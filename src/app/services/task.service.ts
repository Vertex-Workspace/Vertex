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

  public createCalendarTask(id: number, projectId: number): Observable<Task> {
    return this.http.post<Task>(`${URL}google/calendar/${id}`, projectId, { withCredentials: true });
  }

  public getOneById(id: number): Observable<Task> {
    return this.http
      .get<Task>(`${URL}task/${id}`, {withCredentials: true});
  }

  public edit(taskEdit: TaskEdit): Observable<Task> {
    return this.http.patch<Task>(`${URL}task`, taskEdit, {withCredentials: true});
  }

  public create(taskCreate: TaskCreate): Observable<Task> {
    return this.http.post<Task>(`${URL}task`, taskCreate, {withCredentials: true});
  }

  public delete(id: number) {
    return this.http
      .delete(`${URL}task/${id}`, {withCredentials: true});
  }

  public patchValue(valueUpdate: ValueUpdate):Observable<Task>{
    return this.http.patch<Task>(`${URL}task/value`, valueUpdate, {withCredentials: true});
  }


  public getAllByTeam(id: number):Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}team/tasks/${id}`, {withCredentials: true})
  }

  public getAllByUser(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${URL}task/user/${id}`, {withCredentials: true})
  }

  public getPDF(id: number): Observable<ArrayBuffer> {
    return this.http
      .get<ArrayBuffer>(`${URL}task/${id}/pdf`, { responseType: "json", withCredentials: true})
  }

  public getTaskPermissions(taskID: number, userID: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${URL}task/${taskID}/task-permission/${userID}`, {withCredentials: true});
  }


  public saveComment(comment: CommentSend): Observable<Task> {
    return this.http.patch<Task>(`${URL}task/comment`, comment, {withCredentials: true});
  }

  public deleteComment(taskID: number, commentID: number): Observable<Task> {
    return this.http.delete<Task>(`${URL}task/${taskID}/comment/${commentID}`, {withCredentials: true});
  }

  public createChatByTaskId(taskID: number): Observable<Task> {
    return this.http.post<Task>(`${URL}task/${taskID}/chat`, {}, {withCredentials: true});
  }

  public getChatByTaskId(taskID: number): Observable<Chat> {
    return this.http.get<Chat>(`${URL}task/${taskID}/chat`, {withCredentials: true});
  }

  public getTaskInfo(taskId: number) {
    return this.http.get(`${URL}task/info/${taskId}`, {withCredentials: true});
  }

  public getTasksToReview(userID: number, projectID:number): Observable<TaskWaitingToReview[]>{
    return this.http.get<TaskWaitingToReview[]>(`${URL}task/review/${userID}/project/${projectID}`, {withCredentials: true});
  }

  public getPerformanceInTask(taskID:number): Observable<any>{
    return this.http.get(`${URL}task/${taskID}/review/performance`, {withCredentials: true});
  }

  public uploadFile(fd: FormData, id: number, userID : number): Observable<Task> {
    return this.http
      .patch<Task>(`${URL}task/${id}/upload/${userID}`, fd, {withCredentials: true});
  }

  public removeFile(taskId: number, fileId: number): Observable<Task> {
    return this.http
      .delete<Task>(`${URL}task/${taskId}/remove-file/${fileId}`, {withCredentials: true})
  }

  public returnAllResponsables(id: number): Observable<ReturnTaskResponsables> {
    return this.http
      .get<ReturnTaskResponsables>(`${URL}task/taskResponsables/${id}`, {withCredentials: true});
  }

  public updateTaskResponsables(updateResponsible: UpdateResponsibles): Observable<Task> {
    return this.http.patch<Task>(`${URL}task/taskResponsables`, updateResponsible, {withCredentials: true});
  }

  public taskDependency(taskId: number, taskDependencyId: number, task: Task): Observable<Task> {
    return this.http.patch<Task>(`${URL}task/taskDependency/${taskId}/${taskDependencyId}`, task, {withCredentials: true});
  }

  public setTaskDependencyNull(taskId: number, task: Task): Observable<Task>{
    return this.http.patch<Task>(`${URL}task/taskDependency/${taskId}`, task, {withCredentials: true});
  }

  public getTasksDone(id: number): Observable<Boolean> {
    return this.http
      .get<Boolean>(`${URL}task/doneTask/${id}`, {withCredentials: true});
  }

}

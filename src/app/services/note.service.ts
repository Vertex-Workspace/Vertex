import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note } from '../models/class/note';
import { URL } from './path/api_url';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }


  public create(note: Note, userId: number, projectId: number): Observable<Note> {
    return this.http
      .post<Note>(`${URL}note/${projectId}/${userId}`, note, {withCredentials: true});
  }

  public getAllByProject(projectId: number): Observable<Note[]> {
    return this.http 
      .get<Note[]>(`${URL}note/${projectId}`, {withCredentials: true});
  }

  public patchAttribute(note: Note): Observable<Note> {
    return this.http
      .patch<Note>(`${URL}note`, note, {withCredentials: true})
  }

  public delete(id: number): Observable<Note> {    
    return this.http
      .delete<Note>(`${URL}note/${id}`, {withCredentials: true});
  }

  public uploadImage(id: number, fd: FormData) {
    return this.http
      .patch<Note>(`${URL}note/upload/${id}`, fd, {withCredentials: true});
  }

  public removeImage(noteId: number, fileId: number): Observable<Note> {
    return this.http
      .delete<Note>(`${URL}note/remove/${noteId}/${fileId}`, {withCredentials: true});
  }

}

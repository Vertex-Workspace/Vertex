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
      .post<Note>(`${URL}note/${projectId}/${userId}`, note);
  }

  public getAllByProject(projectId: number): Observable<Note[]> {
    return this.http 
      .get<Note[]>(`${URL}note/${projectId}`)
      .pipe(map((notes: Note[]) => 
        notes.map((note: Note) => new Note(note))
      ));
  }

  public patchAttribute(note: Note): Observable<Note> {
    const noteEditing: Note = new Note(note); //converte o dto para note
    return this.http
      .patch<Note>(`${URL}note`, noteEditing)
  }

  public delete(id: number): Observable<Note> {    
    return this.http
      .delete<Note>(`${URL}note/${id}`);
  }

  public uploadImage(id: number, fd: FormData) {
    return this.http
      .patch<Note>(`${URL}note/upload/${id}`, fd);
  }

}

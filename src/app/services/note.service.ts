import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note, NoteGet } from '../models/class/note';
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

  public getAllByProject(teamId: number): Observable<NoteGet[]> {
    return this.http
      .get<Note[]>(`${URL}note/${teamId}`)
      .pipe(map((notes: Note[]) => 
        notes.map((note: Note) => new NoteGet(note))
      ));
  }

  public patchAttribute(note: NoteGet): Observable<Note> {
    const noteEditing: Note = new Note(note); //converte o dto para note
    return this.http
      .patch<Note>(`${URL}note/att`, noteEditing)
  }

  public delete(id: number): void {
    this.http
      .delete<Note>(`${URL}note/${id}`);
  }

}

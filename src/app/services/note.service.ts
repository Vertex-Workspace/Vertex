import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note } from '../models/note';
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

  public getAllByProject(teamId: number): Observable<Note[]> {
    return this.http
      .get<Note[]>(`${URL}note/${teamId}`)
      .pipe(map((notes: Note[]) => 
        notes.map((note: Note) => new Note(note))
      ));
  }

  public patchAttribute(note: Note): Observable<Note> {
    return this.http
      .patch<Note>(`${URL}note/att`, note)
  }

}

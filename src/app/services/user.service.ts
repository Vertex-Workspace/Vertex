import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { URL } from './path/api_url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${URL}user`)
      .pipe(map((users: User[]) => users.map(user => new User(user))));
  } 

  public getOneById(id: number): Observable<User> {
    return this.http
      .get<User>(`${URL}user/${id}`)
      .pipe(map((user: User) => new User(user)));
  }

  public create(user: User): Observable<User> {
    return this.http
      .post<User>(`${URL}user`, user);
  }

  public delete(id: number): Observable<User> {
    return this.http
      .delete<User>(`${URL}user/${id}`);
  }


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { URL } from './path/api_url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) { }

  public register(form: User): void {
    const user: User = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      passwordConf: form.passwordConf
    }

    this.create(user)
      .subscribe(
        (user: User) => {
          this.alert
            .successAlert("Sucesso ao cadastrar usuário!")
        },
        err => {
          console.log(err);
          this.alert
            .errorAlert(err.error);
        }
      )
  }



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

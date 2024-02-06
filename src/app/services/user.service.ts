import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Personalization } from '../models/personalization';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { URL } from './path/api_url';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService,
    private userState: UserStateService
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
          this.login(user);
        },
        e => {
          this.alert
            .errorAlert(e.error);
        }
      )
  }

  public authenticate(form: User): Observable<User> {

    const user: User = {
      firstName: undefined,
      lastName: undefined,
      email: form.email,
      password: form.password
    };

    return this.http
      .post<User>(`${URL}user/authenticate`, user);
  }

  public login(user: User): void {
    this.alert.successAlert(`Bem-vindo, ${user.firstName}!`);
    this.userState.setAuthenticationStatus(true);
    this.saveLoggedUser(user);
    this.router.navigate(['/home']);
  }

  private saveLoggedUser(user: User): void {
    localStorage.setItem('logged', JSON.stringify(user)); //cookies
  }

  public logout(): void {
    this.userState.setAuthenticationStatus(false);
    localStorage.removeItem('logged'); //cookies
    this.router.navigate(['/login']);
  }

  getLogged(): User {
    let user: User = JSON.parse(localStorage.getItem('logged') || '');

    this.getOneByEmail(user.email)
      .subscribe((userFor => {
        user = userFor;
      }))

    return user;
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

  public getUsersByGroup(groupId: number): Observable<User[]> { 
    return this.http
      .get<User[]>(`${URL}user/usersByGroup/${groupId}`)
      .pipe(map((users: User[]) => users.map(user => new User(user))));
  }

  public getUsersByTeam(teamId: any): Observable<User[]> {
    return this.http
      .get<User[]>(`${URL}team/usersByTeam/${teamId}`)
      .pipe(map((users: User[]) => users.map(user => new User(user))));
  }


  public getOneByEmail(email: string): Observable<User> {
    return this.http
      .get<User>(`${URL}user/email/${email}`)
      .pipe(map((user: User) => new User(user)));
  }

  public create(user: User): Observable<User> {
    return this.http
      .post<User>(`${URL}user`, user);
  }

  public patchPersonalization(personalization:Personalization): Observable<User> {    
    return this.http
      .patch<any>(`${URL}user/${personalization.id}/personalization`, personalization);
  }

  public delete(id: number): Observable<User> {
    return this.http
      .delete<User>(`${URL}user/${id}`);
  }

  public update(user: User): Observable<User> {
    this.saveLoggedUser(user);
    return this.http
      .put<User>(`${URL}user`, user);
  }
}

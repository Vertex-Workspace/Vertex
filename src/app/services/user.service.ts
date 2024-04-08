
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Personalization } from '../models/class/personalization';
import { Permission } from '../models/class/user';
import { Team } from '../models/class/team';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/class/user';
import { AlertService } from './alert.service';
import { URL } from './path/api_url';
import { UserStateService } from './user-state.service';
import { defaultImage } from 'src/assets/data/defaultImg';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/class/notification';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private $logged !: BehaviorSubject<User>;
  private logged !: User;
  private defaultImg: string = defaultImage;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService,
    private userState: UserStateService,
  ) {
  }

  public register(form: User): void {

    const user: User = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      image: this.defaultImg,
      firstAccess:true,
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

  public findByfirstName(firstName: string): Observable<User> {
    return this.http
      .get<User>(`${URL}user/firstName/${firstName}`);
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
    this.logged = user;
    this.router.navigate(['/home']);
  }

  public saveLoggedUser(user: User): void {
    localStorage.setItem('logged', JSON.stringify(user)); //cookies
  }

  public logout(): void {
    this.userState.setAuthenticationStatus(false);
    localStorage.removeItem('logged'); //cookies
    this.router.navigate(['/login']);
  }

  getLogged(): User {
    let user: User = JSON.parse(localStorage.getItem('logged') || '');
    return user;
  }

  public getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${URL}user`)
      .pipe(map((users: User[]) => users.map(user => new User(user))));
  }
  
  public getOneById(id: number): Observable < User > {
    return this.http
    .get<User>(`${URL}user/${id}`);
  }

  public getInformationsById(id: number, loggedUser: number): Observable <User> {
    return this.http
    .get<User>(`${URL}user/${id}/informations/${loggedUser}`);
  }

  public getUsersByGroup(groupId: number): Observable<User[]> {
    return this.http
    .get<User[]>(`${URL}user/usersByGroup/${groupId}`)
    .pipe(map((users: User[]) => users.map(user => new User(user))));
  }
  
  public getUsersByTeam(teamId: any): Observable < User[] > {
    return this.http
    .get<User[]>(`${URL}team/usersByTeam/${teamId}`)
    .pipe(map((users: User[]) => users.map(user => new User(user))));
  }
  
  
  public getOneByEmail(email: string): Observable < User > {
    return this.http
    .get<User>(`${URL}user/email/${email}`)
    .pipe(map((user: User) => new User(user)));
  }
  
  public create(user: User): Observable < User > {
    return this.http
    .post<User>(`${URL}user`, user);
  }

  public patchPersonalization(personalization: Personalization): Observable<User> {
    return this.http
    .patch<any>(`${URL}user/${personalization.id}/personalization`, personalization);
  }

  public patchPassword(emailTo: String, password: String): Observable<User> {

    let passwordObj = {
      email: emailTo,
      password: password
    }
    
    return this.http
    .patch<any>(`${URL}user/edit-password`, passwordObj);
  }

  public patchFirstAccess(user:User): Observable<User> {
    return this.http
    .patch<User>(`${URL}user/first-access`, user);
  }
  
  public delete (id: number): Observable < User > {
    return this.http
    .delete<User>(`${URL}user/${id}`);
  }
  
  public update(user: User): Observable < User > {
    this.saveLoggedUser(user);
    return this.http
    .put<User>(`${URL}user`, user);
  }
  
  public uploadImage(file: FormData, id: number): Observable < any > {
    return this.http
    .patch<any>(`${URL}user/upload/${id}`, file);
  }
  
  public updateLoggedUser(user: User): void {
    this.saveLoggedUser(user);
  }

  public getNotifications(userID: number): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(`${URL}user/${userID}/notification`);
  }

  public readNotifications(userID: number, listID: Notification[]): Observable<Notification[]>{
    return this.http
      .patch<Notification[]>(`${URL}user/${userID}/notification/read`, listID);
  }

  public deleteNotifications(userID: number, listID: Notification[]) {
    return this.http
      .patch(`${URL}user/${userID}/notification/delete`, listID);
  }

  public notificationSettings(userID: number, settingID: number) {
    return this.http
      .patch<User>(`${URL}user/${userID}/notification/settings/${settingID}`, {});
  }
}
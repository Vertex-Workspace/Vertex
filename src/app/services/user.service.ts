
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public register(form: User) {

    form.image = this.defaultImg;
    form.firstAccess = true;

    this.http.post<User>(`${URL}user/register`, form).subscribe(
      (userRes: User) => {
        this.login(userRes);
    }, (e) => {
      this.alert.errorAlert(e.error);
  
    });
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
      .post<User>(`${URL}authenticate-user`, user, {withCredentials: true});
  }

  public login(user: User): void {
    this.http
    .post<User>(`${URL}login`, user, {withCredentials: true}).subscribe(
      (user: User) => {
        console.log(user);
        this.alert.successAlert(`Bem-vindo, ${user.firstName}!`);
        this.logged = user;
        this.userState.setAuthenticationStatus(true);
        this.saveLoggedUser(user);
        this.alert.successAlert(`Bem-vindo, ${user.firstName}!`);
        this.router.navigate(['/home']);
    }, (e) => {
      this.alert.errorAlert(e.error);
    });
  }

  public saveLoggedUser(user: User): void {
    localStorage.setItem('logged', JSON.stringify(user)); //cookies
  }

  public logout(): void {
    this.userState.setAuthenticationStatus(false);
    localStorage.removeItem('logged'); //cookies
    this.router.navigate(['/login']);
  }

  getLogged(): any {
    let user: User = JSON.parse(localStorage.getItem('logged') || '');
    return user
  }
  
  public getOneById(id: number): Observable < User > {
    return this.http
    .get<User>(`${URL}user/${id}`, {withCredentials: true});
  }

  public getInformationsById(id: number, loggedUser: number): Observable <User> {
    return this.http
    .get<User>(`${URL}user/${id}/informations/${loggedUser}`, {withCredentials: true});
  }

  public getUsersByGroup(groupId: number): Observable<User[]> {
    return this.http
    .get<User[]>(`${URL}user/usersByGroup/${groupId}`, {withCredentials: true});
  }
  
  public getUsersByTeam(teamId: any): Observable < User[] > {
    return this.http
    .get<User[]>(`${URL}team/usersByTeam/${teamId}`, {withCredentials: true});
  }
  


  public patchPersonalization(personalization: Personalization): Observable<User> {
    return this.http
    .patch<any>(`${URL}user/${personalization.id}/personalization`, personalization, {withCredentials: true});
  }

  public patchPassword(emailTo: String, password: String): Observable<User> {

    let passwordObj = {
      email: emailTo,
      password: password
    }
    
    return this.http
    .patch<any>(`${URL}user/edit-password`, passwordObj, {withCredentials: true});
  }

  public patchFirstAccess(user:User): any {
    this.http
    .patch<User>(`${URL}user/first-access`, user, {withCredentials: true}).subscribe((user: User) => {
      this.saveLoggedUser(user);
    });
  }
  

  public update(user: User): Observable < User > {
    this.saveLoggedUser(user);
    return this.http
    .put<User>(`${URL}user`, user, {withCredentials: true});
  }
  
  public uploadImage(file: FormData, id: number): Observable < any > {
    return this.http
    .patch<any>(`${URL}user/upload/${id}`, file, {withCredentials: true});
  }
  
  public updateLoggedUser(user: User): void {
    this.saveLoggedUser(user);
  }

  public getNotifications(userID: number): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(`${URL}user/${userID}/notification`, {withCredentials: true});
  }

  public readNotifications(userID: number, listID: Notification[]): Observable<Notification[]>{
    return this.http
      .patch<Notification[]>(`${URL}user/${userID}/notification/read`, listID, {withCredentials: true});
  }

  public deleteNotifications(userID: number, listID: Notification[]) {
    return this.http
      .patch(`${URL}user/${userID}/notification/delete`, listID, {withCredentials: true});
  }

  public notificationSettings(userID: number, settingID: number) {
    return this.http
      .patch<User>(`${URL}user/${userID}/notification/settings/${settingID}`, {}, {withCredentials: true});
  }
}
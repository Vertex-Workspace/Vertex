
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Personalization } from '../models/class/personalization';
import { ChangePassword, Permission } from '../models/class/user';
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
        this.login(form);
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
    .post<User>(`${URL}login`, {email: user.email, password: user.password}, {withCredentials: true}).subscribe(
      (user: User) => {
        this.alert.successAlert(`Bem-vindo, ${user.firstName}!`);
        this.saveLoggedUser(user);
        window.location.reload();
    }, (e) => {
      this.alert.errorAlert(e.error);
    });
  }

  public saveLoggedUser(user: User): void {
    localStorage.setItem('logged', JSON.stringify(user)); //cookies
  }

  public logout(): void {
    this.http.post(`${URL}logout`, {}, {withCredentials: true})
    .subscribe(() => this.logoutFrontEnd());
  }

  private logoutFrontEnd(){
    this.userState.setAuthenticationStatus(false);
    localStorage.removeItem('logged'); //cookies
    window.location.reload();
  }

  getLogged(): any {
    const loggedIntoLocalStorage = JSON.parse(localStorage.getItem('logged')!);
    if(loggedIntoLocalStorage == null || loggedIntoLocalStorage == ''){
      this.logoutFrontEnd();
    }
    return loggedIntoLocalStorage
  }
  
  public getOneById(id: number): Observable < User > {
    return this.http
    .get<User>(`${URL}user/${id}`, {withCredentials: true});
  }

  public getInformationsById(id: number): Observable <User> {
    return this.http
    .get<User>(`${URL}user/${id}/informations`, {withCredentials: true});
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
    .patch<any>(`${URL}user/${this.getLogged().id}/personalization`, personalization, {withCredentials: true});
  }

  public patchPassword(emailTo: String, password: String): Observable<User> {

    let passwordObj = {
      email: emailTo,
      password: password
    }
    
    return this.http
    .patch<any>(`${URL}user/edit-password`, passwordObj, {withCredentials: true});
  }

  public patchFirstAccess(user:User) {
    this.http
    .patch<User>(`${URL}user/first-access/${user.id}`, {}, {withCredentials: true}).subscribe((user: User) => {
      this.saveLoggedUser(user);
    }, error => console.log(error)
    );
  }
  public patchShowCharts(userID: number){
    return this.http
    .patch<User>(`${URL}user/${userID}/show-charts`, {}, {withCredentials: true});
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

  public setFirstAccessNull(user: User){
    return this.http
    .patch<User>(`${URL}user/first-access/${user.id}`, user, {withCredentials: true});
  }

  public changePassword(changePassword : ChangePassword){
    return this.http
    .patch(`${URL}user/password`, changePassword, {withCredentials: true});
  }
}
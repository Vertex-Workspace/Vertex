import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/class/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { URL } from './path/api_url';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  
  private isAuthenticated: BehaviorSubject<boolean> = 
      new BehaviorSubject<boolean>(
        localStorage.getItem('logged') !== null
      ); //validate token
  
  constructor(private http : HttpClient, private router : Router) { }

  setAuthenticationStatus(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  getAuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  async getAuthenticatedUser(): Promise<boolean> {
    try{
      if(!document.cookie.includes('JWT')){
        this.notLogged();
        return false;
      }

      const user : User | undefined = await this.http.get<User>(`${URL}authenticate-user`, { withCredentials: true }).toPromise();

      if(user != undefined){
        this.saveLoggedUser(user!);
        this.setAuthenticationStatus(true);
        return true;
      } else {
        this.notLogged();
        return false;
      }
    } catch(error){
      this.notLogged();
      return false;
    }
  }

  public notLogged(){
    this.setAuthenticationStatus(false);
    localStorage.removeItem('logged');
    document.cookie = "JWT" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "JSESSIONID" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }

  public saveLoggedUser(user: User): void {
    localStorage.setItem('logged', JSON.stringify(user));
  }

}

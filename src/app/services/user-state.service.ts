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

  validateLoggedToken(): boolean {
    return false;
  }

  async getAuthenticatedUser(): Promise<boolean> {
    try{
      if(!document.cookie.includes('JWT')){
        return false;
      }
      const user : User | undefined = await this.http.get<User>(`${URL}authenticate-user`, { withCredentials: true }).toPromise();
      if(user != undefined){
        this.setAuthenticationStatus(true);
        this.saveLoggedUser(user!);
      }
      return true;
    } catch(error){
      this.setAuthenticationStatus(false);
      this.router.navigate(['/login']);
      localStorage.removeItem('logged');
      return false;
    }
  }

  public saveLoggedUser(user: User): void {
    localStorage.setItem('logged', JSON.stringify(user));
  }

}

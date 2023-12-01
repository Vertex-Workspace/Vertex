import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  
  private isAuthenticated: BehaviorSubject<boolean> = 
      new BehaviorSubject<boolean>(
        localStorage.getItem('logged') !== null
      );
  
  constructor() { }

  setAuthenticationStatus(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  getAuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  validateLoggedToken(): boolean {
    //////////////
    return false;
  }

}

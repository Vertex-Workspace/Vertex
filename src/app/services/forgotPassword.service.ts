import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from './path/api_url';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  
  constructor(
    private http: HttpClient,
  ) { 
  } 

  public sendMessageToEmail(emailTo:String): Observable<any> {
    return this.http.get(`${URL}forgotPassword/"${emailTo}`, {withCredentials: true});
  }

}

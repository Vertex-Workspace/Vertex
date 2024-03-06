import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  
  constructor(
    private http: HttpClient,
  ) { 
  } 

  public sendMessageToEmail(emailTo:String): Observable<any> {
    return this.http.get("http://localhost:7777/forgotPassword/"+emailTo);
  }

}

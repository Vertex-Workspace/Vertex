import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './path/api_url';
import { map, Observable } from 'rxjs';
import { Personalization } from '../models/class/personalization';
import { User } from '../models/class/user';



@Injectable({
  providedIn: 'root',
})
export class PersonalizationService {
  constructor(private http: HttpClient) { }

  
  findById(id:number): Observable<Personalization> {
    return this.http.get<Personalization>(`${URL}personalization/${id}`, {withCredentials: true});
  }

  findByUserId(userId: number): Observable<Personalization> {
    return this.http.get<Personalization>(`${URL}api/personalization/${userId}`, {withCredentials: true});
  }

  getAllPersonalization(): Observable<Personalization[]> {
    return this.http.get<Personalization[]>(`${URL}personalization`, {withCredentials: true});
  }

  public changeLanguage(language: any, userId: number): Observable<User> {
    return this.http.patch<any>(`${URL}user/${userId}/personalization/changeLanguage`, language, {withCredentials: true});
  }



  // ========================================================================================
  // LOCAL STORAGE 
  getPrimaryColor(): string {
    return JSON.parse(localStorage.getItem('personalization')!).primaryColorLi;
  }


  getSecondColor(): string {
    return JSON.parse(localStorage.getItem('personalization')!).secondColor;
  }

  getTittleFont(): string {
    return JSON.parse(localStorage.getItem('personalization')!).tittleFont;
  }

  getTextFont(): string {
    return JSON.parse(localStorage.getItem('personalization')!).textFont;
  }
}

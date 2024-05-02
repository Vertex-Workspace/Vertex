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

  
  findByUserId(userId: number): Observable<Personalization> {
    return this.http.get<Personalization>(`${URL}api/personalization/${userId}`, {withCredentials: true});
  }

  public changeLanguage(language: any, userId: number): Observable<User> {
    return this.http.patch<any>(`${URL}user/${userId}/personalization/changeLanguage`, language, {withCredentials: true});
  }

  public setPersonalization(personalization: Personalization) {
    document.documentElement.style.transition = 'color 0.5s, background-color 0.5s';
    document.documentElement.style.setProperty('--primaryColor', personalization?.primaryColor!);
    if (personalization!.theme == 0) {
      document.documentElement.style.setProperty('--secondColor', "#F3F3F3");
      
      document.documentElement.style.setProperty('--emphasis', "#D9D9D9");
      document.documentElement.style.setProperty('--card', "#FFFFFF");
      
      document.documentElement.style.setProperty('--text', "#000000");
    } else if (personalization!.theme == 1) {
      document.documentElement.style.setProperty('--secondColor', "#1E1E1E");
      document.documentElement.style.setProperty('--emphasis', "#161616");
      document.documentElement.style.setProperty('--card', "#161616");
      document.documentElement.style.setProperty('--text', "#BABABA");
    }
    this.setTextVariables(personalization);
  }

  public setTextVariables(personalization: Personalization){
    document.documentElement.style.setProperty('--smallText', (personalization?.fontSize! - 2) + 'px');
    document.documentElement.style.setProperty('--regularText', (personalization?.fontSize!) + 'px');
    document.documentElement.style.setProperty('--mediumText', (personalization?.fontSize! + 2) + 'px');
    document.documentElement.style.setProperty('--largeText', (personalization?.fontSize! + 4) + 'px');
    document.documentElement.style.setProperty('--fontFamily', personalization?.fontFamily!);
  }

}

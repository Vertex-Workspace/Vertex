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

  setPersonalization(): void {
    // const defaultColors: Personalization = {
    //   primaryColor: 1,
    //   secondColor: 1,
    //   tittleFont: "'Manrope', sans-serif",
    //   textFont: "'Inter', sans-serif",
    // };
    // localStorage.setItem('personalization', JSON.stringify(defaultColors));
  }

  findById(id:number): Observable<Personalization> {
    return this.http.get<Personalization>(`${URL}personalization/${id}`)
    .pipe(map((personalization: Personalization) => new Personalization(personalization)));;
  }

  getPrimaryColor(): string {
    return JSON.parse(localStorage.getItem('personalization')!).primaryColorLi;
  }

  getAllPersonalization(): Observable<Personalization[]> {
    return this.http.get<Personalization[]>(`${URL}personalization`);
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './path/api_url';

interface Personalization {
  primaryColor: string;
  secondColor: string;
  tittleFont: string;
  textFont: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonalizationService {
  constructor(private http : HttpClient) {}

  setPersonalization(): void {
    const defaultColors: Personalization = {
      primaryColor: '#010101',
      secondColor: '#F3F3F3',
      tittleFont: "'Manrope', sans-serif",
      textFont: "'Inter', sans-serif",
    };
    localStorage.setItem('personalization', JSON.stringify(defaultColors));
  }

  getPrimaryColor(): string {
    return JSON.parse(localStorage.getItem('personalization')!).primaryColor;
  }

  getAllPersonalization(): any{
    return this.http.get(`${URL}personalization`).subscribe((response:any) => {
     console.log(response);
      
    })
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

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor() { }

  isMobile(): boolean {
    return window.innerWidth <= 640;
  }

}

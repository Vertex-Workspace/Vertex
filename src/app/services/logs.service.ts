import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

    constructor(private http : HttpClient) { }

    getLogs() {
        return this.http.get('http://localhost:7777/logs');
    }
  
}

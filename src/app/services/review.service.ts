import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from './path/api_url';
import { SentToReview } from '../models/class/review';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private http: HttpClient
  ) { }

  public sentToReview(initialReview: SentToReview): Observable<Boolean> {  
    return this.http
      .post<Boolean>(`${URL}task/review/send`, initialReview);
  }

}
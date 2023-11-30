import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  hide():void{
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 3000);
  }

  show():void{
    this.loadingSubject.next(true);
  }
}

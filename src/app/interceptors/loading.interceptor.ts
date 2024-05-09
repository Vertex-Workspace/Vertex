import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private activeRequests = 0;

  constructor(private loadingService: LoadingService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.activeRequests === 0) {
      if(request.method !== 'PATCH' && request.method !== 'DELETE'){
        this.loadingService.show();
      }
    }
    this.activeRequests++;
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403 || error.status === 409) {
          this.router.navigate(['/acesso-negado']);
        }
        return throwError(error);
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}

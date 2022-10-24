import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { RequestService } from './shared/services/request.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(public request: RequestService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.request.loader.next(true);
    return next.handle(request).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.request.loader.next(false);
      })
    );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}

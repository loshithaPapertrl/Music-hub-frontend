import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Exclude JWT token for login requests
    if (request.url.endsWith('/authenticate')) {
      return next.handle(request);
    }

    const localToken = localStorage.getItem('token');
    request = request.clone({headers:request.headers.set('Authorization','Bearer ' +localToken)})
    return next.handle(request);
  }
}

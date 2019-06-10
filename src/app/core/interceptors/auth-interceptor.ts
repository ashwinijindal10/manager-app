import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser = localStorage.getItem('userEmail');
    request = request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json',
        'CreatedBy': currentUser
      }
    });

    return next.handle(request);
  }
}

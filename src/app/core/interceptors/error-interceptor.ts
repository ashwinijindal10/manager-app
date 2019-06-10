import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';
import { Injectable } from '@angular/core';


@Injectable()
// export class LoadingIndicatorService {

//     private preloading: boolean = false;

//     get loading(): boolean {
//         return this.preloading;
//     }

//     onRequestStarted(): void {
//         this.preloading = true;
//     }

//     onRequestFinished(): void {
//         this.preloading = false;
//     }
// }


export class HttpErrorInterceptor implements HttpInterceptor {
  constructor (private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
      catchError((response: HttpErrorResponse) => {
          // this.errorHandler.handleError(error)
          let errorMessage = '';
          // client errors 4xx
          if (response.status === 401) {
              // todo: redirect to the login route or show a modal
              errorMessage = `There was a problem with the client request.`;
              // this.alertSvc.error(errorMessage);
           } else if (response.status === 500) { // server errors 5xx
              errorMessage = `There was a problem with the server.`;
              // this.alertSvc.error(errorMessage);
           } else if (response.status === 200) {
             // console.log(response.message.success);
            // this.alertService.success(response);
            return;
           } else if (response.status === 404) {
            return;
            // this.alertSvc.error(errorMessage);
         } else {
              errorMessage = `There was a problem with the system. Please contact Admin`;
          }

          if (response.error && response.error.message && response.error.message.errors && response.error.message.errors.length > 0) {
             this.alertService.error(response.error.message.errors[0].message);
             return throwError(errorMessage);
          }
          this.alertService.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}

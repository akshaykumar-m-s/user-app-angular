import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const response = event.body as any;
          // if (event.status === 200) {
          //     this.toastr.info('Request Completed');
          // }
        }
      }),
      catchError(
        (
          error: any,
          caught: Observable<any>
        ): Observable<HttpErrorResponse | HttpErrorResponse> => {
          if (error instanceof HttpErrorResponse && error.status === 400) {
            // this.toastr.error(error.error, 'Oops!!');
            console.error(error);

            return observableThrowError(error);
          }
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.error(error);

            return observableThrowError(error);
          }
          if (error instanceof HttpErrorResponse && error.status === 403) {
            console.error(error);

            return observableThrowError(error);
          }
          if (error instanceof HttpErrorResponse && error.status === 404) {
            console.error(error);
            this.router.navigateByUrl('/auth/login');

            return observableThrowError(error);
          }
          if (error instanceof HttpErrorResponse && error.status === 500) {
            console.error(error);

            return observableThrowError(error);
          }
          if (
            error instanceof HttpErrorResponse &&
            error.message ===
              'Http failure response for (unknown url): 0 Unknown Error'
          ) {
            if (error.status === 0) {
              sessionStorage.clear();
            } else {
              sessionStorage.clear();
            }
          }
          return observableThrowError(error);
        }
      )
    );
  }
}

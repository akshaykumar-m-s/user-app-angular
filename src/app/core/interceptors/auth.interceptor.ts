import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class AuthInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'token');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    const baseUrl = environment.ip + 'api' + req.urlWithParams;

    const token = localStorage.getItem('token');
    if (!!token) {
      let authenticatedHeader = new HttpHeaders();
      console.log(req.headers.has('Content-Type'));
      console.log(req.headers.has('Accept'));
      console.log(req.headers.keys());
      if (!req.headers.has('Content-Type')) {
        authenticatedHeader = authenticatedHeader.set(
          'Content-Type',
          'application/json'
        );
      } else {
        req.headers.delete('Content-Type');
      }
      if (req.headers.has('Accept')) {
        authenticatedHeader = authenticatedHeader.set(
          'Accept',
          'application/json'
        );
      } else {
        req.headers.delete('Accept');
      }
      authenticatedHeader = authenticatedHeader.set('Authorization', token);

      const authReq = req.clone({ headers: authenticatedHeader, url: baseUrl });

      return next.handle(authReq);
    }
    const anonymousReq = req.clone({ url: baseUrl, headers: headers });
    return next.handle(anonymousReq);
  }
}

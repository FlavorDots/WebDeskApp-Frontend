import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class HttpinterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private injector: Injector
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    if (
      this.authenticationService.isUserLoggedIn() &&
      req.url.indexOf('basicauth') === -1
    ) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${authService.getIt()}`,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
    console.log(this.intercept);
  }
}

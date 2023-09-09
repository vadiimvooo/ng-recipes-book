import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (user && user.token) {
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token)
          });

          return this.handleRequest(modifiedReq, next);
        }

        return this.handleRequest(req, next);
      })
    );
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
  }
}

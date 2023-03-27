import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '@services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenServices : TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.addToken(request, next);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler){
    const accessToken = this.tokenServices.getToken();
    if (accessToken) {
      const authRequest = request.clone({
        headers:request.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next.handle(authRequest);
    };
    return next.handle(request);
  }
}

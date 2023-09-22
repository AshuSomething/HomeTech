import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this._injector.get(AuthService);
    let tokanizedRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokanizedRequest);
  }
}

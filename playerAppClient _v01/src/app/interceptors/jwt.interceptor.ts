import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JWT_NAME} from "../components/auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('intercepted request ... ');
    const token = localStorage.getItem(JWT_NAME);

    if (token) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", token)
      });

      return next.handle(cloned);

    } else {
      return next.handle(request);
    }


  }
}

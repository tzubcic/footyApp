import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoaderService} from "./loader.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loaderService.isLoading.next(false);
        }
        , 2000);
      })
    )
  }
}

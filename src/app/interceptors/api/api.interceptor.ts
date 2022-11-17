import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Api } from '../../@types/api';
import { camelizeKeys, snakeKeys } from '../../helpers/api';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Api<unknown>>> {
    const modifiedRequest = request.clone({
      headers: request.headers
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json'),
      body: JSON.stringify(snakeKeys(request.body)),
    })

    return next.handle(modifiedRequest).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.clone({
            body: camelizeKeys(event.body),
          });
        }
        if (event instanceof HttpErrorResponse) {
          throw Error();
        }
        return event;
      })
    )
  }
}
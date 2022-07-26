import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorCode } from '@td/common/error';
import { AuthTokens } from '@td/common/types';
import {
  BehaviorSubject,
  catchError,
  filter,
  from,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { APP_CONFIG, AppConfig } from '../providers/config.provider';
import { StorageKeys, StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private _isRefreshing: boolean = false;
  private _refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private storage: StorageService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addAccessToken(request);
    return next.handle(request)
    .pipe(
      catchError(err => {
        if (err?.error?.code === ErrorCode.ACCESS_TOKEN_EXPIRED) {
          return this.refreshToken(request, next);
        }
        else {
          return throwError(err);
        }
      }),
      catchError(err => {
        if (err?.error?.statue === 401 || err?.status === 401) {
          this.storage.clear();
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      }),
    );
  }

  private addAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken: string | null = this.storage.get<string | null>(StorageKeys.ACCESS_TOKEN);
    return accessToken ? request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }) : request;
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next(null);

      const url = `${this.appConfig.apiHost}/auth/token/refresh`;
      const refreshToken: string = this.storage.get<string>(StorageKeys.REFRESH_TOKEN) as string;
      const promise = fetch(url, {
        method: 'GET',
        headers: {
          'x-refresh-token': refreshToken,
        },
      }).then(res => res.json());

      return from(promise).pipe(
        switchMap((tokens: AuthTokens) => {
          const { accessToken, refreshToken } = tokens;
          this.storage.set(StorageKeys.ACCESS_TOKEN, accessToken);
          this.storage.set(StorageKeys.REFRESH_TOKEN, refreshToken);
          this._isRefreshing = false;
          this._refreshTokenSubject.next(accessToken);
          return next.handle(this.addAccessToken(request));
        }),
      );
    }
    else {
      return this._refreshTokenSubject
      .pipe(
        filter(token => !!token),
        take(1),
        switchMap(() => next.handle(this.addAccessToken(request))),
      );
    }
  }
}

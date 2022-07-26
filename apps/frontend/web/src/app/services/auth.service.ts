import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ErrorCode } from '@td/common/error';
import { AuthTokens, User } from '@td/common/types';
import { BehaviorSubject, catchError, filter, finalize, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../providers/config.provider';
import { AuthBaseService } from './auth-base.service';
import { StorageKeys, StorageService } from './storage.service';

@Injectable()
export class AuthService extends AuthBaseService {
  readonly me$: Observable<User | null>;

  readonly loggedIn$: Observable<boolean>;
  readonly BASE_URL: string;
  private _loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _meSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    @Inject(APP_CONFIG) appConfig: AppConfig,
  ) {
    super();
    this.BASE_URL = appConfig.apiHost;
    this.loggedIn$ = this._loggedInSubject.asObservable();
    this.me$ = this._meSubject.asObservable();
    this._init();
  }

  get me(): User | null {
    return this._meSubject.value;
  }

  join({ email, name }: Partial<User>, password: string): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/auth/join`, { email, name, password });
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          const { accessToken, refreshToken } = res;
          this.storage.set(StorageKeys.ACCESS_TOKEN, accessToken);
          this.storage.set(StorageKeys.REFRESH_TOKEN, refreshToken);
          this._loggedInSubject.next(true);
        }),
        map(res => undefined)
      );
  }

  logout(): Observable<void> {
    const refreshToken: string = this.storage.get(StorageKeys.REFRESH_TOKEN) as string;
    return this.http.get(`${this.BASE_URL}/auth/logout`, { headers: { 'x-refresh-token': refreshToken } })
      .pipe(
        finalize(() => this._processLogout()),
        map(res => undefined)
      );
  }

  private _processLogout() {
    this.storage.clear();
    this._meSubject.next(null);
    this._loggedInSubject.next(false);
  }

  private _init() {
    this._loggedInSubject.next(!!this.storage.get(StorageKeys.ACCESS_TOKEN));
    this.loggedIn$.pipe(
      filter(loggedIn => loggedIn),
      switchMap(() =>
        this.http.get<User>(`${this.BASE_URL}/auth/me`)
      ),
    ).subscribe({
      next: me => this._meSubject.next(me),
      error: () => this._processLogout(),
    });
  }
}

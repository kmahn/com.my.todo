import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '@td/common/types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../providers/config.provider';
import { AuthBaseService } from './auth-base.service';
import { StorageKeys, StorageService } from './storage.service';

@Injectable()
export class AuthService extends AuthBaseService {

  readonly loggedIn$: Observable<boolean>;
  readonly BASE_URL: string;

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    @Inject(APP_CONFIG) appConfig: AppConfig,
  ) {
    super();
    this.BASE_URL = appConfig.apiHost;
    this.loggedIn$ = this.loggedInSubject.asObservable();

    if (this.storage.get(StorageKeys.ACCESS_TOKEN)) {
      this.loggedInSubject.next(true);
    }
  }

  join({ email, name }: Partial<User>, password: string): Observable<void> {
    return of(undefined);
  }

  login(email: string, password: string): Observable<void> {
    return of(undefined);
  }
}

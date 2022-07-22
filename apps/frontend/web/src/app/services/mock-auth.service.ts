import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorCode } from '@td/common/error';
import { Auth, User } from '@td/common/types';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthBaseService } from './auth-base.service';

@Injectable()
export class MockAuthService extends AuthBaseService {
  readonly users: User[] = [{
    _id: '1',
    email: 'test@test.com',
    name: '홍길동',
    role: 'member',
    auth: '1',
  }];
  readonly auths: Auth[] = [{
    _id: '1',
    providerId: '1',
    provider: 'local',
    password: 'asdf',
    user: '1',
  }];

  readonly loggedIn$: Observable<boolean>;

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    super();
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  join({ email, name }: Partial<User>, password: string): Observable<void> {
    const _id = String(this.users.length + 1);
    const exUser = this.users.find(user => user.email === email);
    if (exUser) {
      return throwError(() => new HttpErrorResponse({
          status: 400,
          error: { code: ErrorCode.EMAIL_USED }
        })
      );
    }

    this.users.push({
      _id,
      email: email!,
      name: name!,
      role: 'member',
      auth: _id,
    });

    this.auths.push({
      _id,
      providerId: _id,
      provider: 'local',
      password,
      user: _id,
    });
    return of(undefined);
  }

  login(email: string, password: string): Observable<void> {
    const index = this.users.findIndex(user => user.email === email);
    if (index === -1) {
      return throwError(() => new HttpErrorResponse({
          status: 404,
          error: { code: ErrorCode.USER_NOT_FOUND }
        })
      );
    }

    if (this.auths[index].password !== password) {
      return throwError(() => new HttpErrorResponse({
        status: 401,
        error: { code: ErrorCode.INVALID_PASSWORD }
      }));
    }

    this.loggedInSubject.next(true);

    return of(undefined);
  }
}

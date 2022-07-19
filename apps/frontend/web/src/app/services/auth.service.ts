import { Injectable } from '@angular/core';
import { User } from '@td/common/types';
import { Observable, of } from 'rxjs';
import { AuthBaseService } from './auth-base.service';

@Injectable()
export class AuthService extends AuthBaseService {

  readonly loggedIn$: Observable<boolean>;

  constructor() {
    super();
    this.loggedIn$ = of(false);
  }

  join({ email, name }: Partial<User>, password: string): Observable<void> {
    return of(undefined);
  }

  login(email: string, password: string): Observable<void> {
    return of(undefined);
  }
}

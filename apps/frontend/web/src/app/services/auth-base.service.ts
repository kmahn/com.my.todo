import { Auth, User } from '@td/common/types';
import { Observable } from 'rxjs';

export abstract class AuthBaseService {
  abstract readonly me$: Observable<User | null>;
  abstract readonly loggedIn$: Observable<boolean>;

  protected constructor() {
  }

  abstract get me(): User | null;

  abstract login(email: string, password: string): Observable<void>;

  abstract join({
                  email,
                  name,
                  password,
                }: Pick<User & Auth, 'email' | 'name' | 'password'>): Observable<void>;

  abstract logout(): Observable<void>;
}

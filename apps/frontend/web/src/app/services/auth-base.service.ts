import { User } from '@td/common/types';
import { Observable } from 'rxjs';

export abstract class AuthBaseService {
  abstract readonly me$: Observable<User | null>;
  abstract readonly loggedIn$: Observable<boolean>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected constructor() {
  }

  abstract get me(): User | null;

  abstract login(email: string, password: string): Observable<void>;

  abstract join({ email, name }: Partial<User>, password: string): Observable<void>;

  abstract logout(): Observable<void>;
}

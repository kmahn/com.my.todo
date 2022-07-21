import { Provider } from '@nestjs/common';
import { AuthTokensRepository } from './auth-tokens-repository';
import { AuthTokensRepositoryImpl } from './impl/auth-tokens-repository.impl';
import { UserRepositoryImpl } from './impl/user-repository.impl';
import { UserRepository } from './user-repository';

export const Repositories: Provider[] = [
  { provide: AuthTokensRepository, useClass: AuthTokensRepositoryImpl },
  { provide: UserRepository, useClass: UserRepositoryImpl }
];

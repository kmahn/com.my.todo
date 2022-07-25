import { Provider } from '@nestjs/common';
import { AuthTokensRepository } from './auth-tokens-repository';
import { UserRepository } from './user-repository';
import { AuthTokensRepositoryImpl } from './impl/auth-tokens-repository.impl';
import { UserRepositoryImpl } from './impl/user-repository.impl';

export const Repositories: Provider[] = [
  { provide: UserRepository, useClass: UserRepositoryImpl },
  { provide: AuthTokensRepository, useClass: AuthTokensRepositoryImpl },
];

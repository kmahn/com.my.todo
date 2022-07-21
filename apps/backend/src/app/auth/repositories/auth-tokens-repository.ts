import { AuthTokens, UserProfile } from '@td/common/types';

export interface AuthTokensRepository {
  createAuthTokens(userProfile: UserProfile): Promise<AuthTokens>;

  updateAuthTokens(oldRefreshToken: string, userProfile: UserProfile): Promise<AuthTokens>;
}

export const AuthTokensRepository = Symbol('AuthTokensRepository');

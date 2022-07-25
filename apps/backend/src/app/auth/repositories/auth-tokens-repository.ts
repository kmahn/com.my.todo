import { AuthTokens, UserProfile } from '@td/common/types';

export interface AuthTokensRepository {
  createAuthTokens(userProfile: UserProfile): Promise<AuthTokens>;

  updateAuthTokens(oldRefreshToken: string): Promise<AuthTokens>;

  remove(refreshToken: string): Promise<void>;
}

export const AuthTokensRepository = Symbol('AuthTokensRepository')

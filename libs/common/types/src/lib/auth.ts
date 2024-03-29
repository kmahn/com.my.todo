export const AUTH_PROVIDERS = ['local', 'kakao'] as const;
export type AuthProviderType = typeof AUTH_PROVIDERS[number];

export interface Auth {
  _id: string;
  providerId: string;
  provider: AuthProviderType;
  password: string;
  user: string;

  validatePassword?(password: string): boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

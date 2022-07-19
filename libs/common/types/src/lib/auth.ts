export const AUTH_PROVIDERS = ['local', 'kakao'] as const;
export type AuthProviderType = typeof AUTH_PROVIDERS[number];

export interface Auth {
  providerId: string;
  provider: AuthProviderType;
  password: string;
  user: string;
}

import { registerAs } from '@nestjs/config';
import { ConfigTokens } from './config-tokens';

export const jwtConfig = registerAs(ConfigTokens.JWT, () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

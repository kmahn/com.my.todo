import { registerAs } from '@nestjs/config';
import { ConfigTokens } from './config-tokens';

export const adminConfig = registerAs(ConfigTokens.ADMIN, () => ({
  email: process.env.ADMIN_EMAIL,
  name: process.env.ADMIN_NAME,
  password: process.env.ADMIN_PASSWORD,
}));

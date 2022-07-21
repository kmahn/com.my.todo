import { registerAs } from '@nestjs/config';
import { ConfigTokens } from './config-tokens';

export const mongoConfig = registerAs(ConfigTokens.MONGO, () => ({
  uri: process.env.MONGO_URI,
}));

import { registerAs } from '@nestjs/config';
import { ConfigTokens } from './config-tokens';

export const uploadConfig = registerAs(ConfigTokens.UPLOAD, () => ({
  dest: process.env.UPLOAD_DEST,
}));

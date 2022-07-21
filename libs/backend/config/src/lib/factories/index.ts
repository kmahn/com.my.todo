import { ConfigFactory } from '@nestjs/config';
import { adminConfig } from './admin.config';
import { jwtConfig } from './jwt.config';
import { mongoConfig } from './mongo.config';
import { uploadConfig } from './upload.config';

export * from './admin.config';
export * from './config-tokens';

export const load: ConfigFactory[] = [adminConfig, jwtConfig, mongoConfig, uploadConfig];

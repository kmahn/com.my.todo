import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { load } from './factories';
import { validationSchema } from './validation-schema';

const envFilePath: string[] = [
  join(__dirname, '../../../config/env', '.common.env'),
  join(__dirname, '../../../config/env', `.${process.env.NODE_ENV || 'development'}.env`),
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      load,
      validationSchema,
    }),
  ],
})

export class BackendConfigModule {
}

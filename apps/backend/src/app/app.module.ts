import { Module } from '@nestjs/common';
import { BackendConfigModule } from '@td/backend/config';
import { BackendDatabaseModule } from '@td/backend/database';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BackendConfigModule,
    BackendDatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

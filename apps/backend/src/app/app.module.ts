import { Module } from '@nestjs/common';
import { BackendConfigModule } from '@td/backend/config';
import { BackendDatabaseModule } from '@td/backend/database';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [BackendConfigModule, BackendDatabaseModule, AuthModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

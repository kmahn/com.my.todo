import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TodoService } from './application/todo.service';
import { Repositories } from './repositories';
import { TodoController } from './interface/todo.controller';

@Module({
  imports: [AuthModule],
  controllers: [TodoController],
  providers: [
    ...Repositories,
    TodoService,
  ],
})
export class TodoModule {
}

import { Provider } from '@nestjs/common';
import { TodoRepositoryImpl } from './impl/todo-repository.impl';
import { TodoRepository } from './todo-repository';

export const Repositories: Provider[] = [
  { provide: TodoRepository, useClass: TodoRepositoryImpl },

];

import { Inject, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';
import { Todo, User, UserProfile } from '@td/common/types';
import { TodoRepository } from '../repositories/todo-repository';

@Injectable()
export class TodoService {
  constructor(
    @Inject(TodoRepository) private todoRepository: TodoRepository,
  ) {
  }

  async findAll(): Promise<Partial<Todo>[]> {
    return this.todoRepository.findAll();
  }

  async findMyTodos(id: string) {
    return this.todoRepository.findAll({ user: id });
  }

  async findOne(id: string, user: UserProfile): Promise<Partial<Todo>> {
    const document = await this.todoRepository.findOne(id);
    if (user.role !== 'admin' && String((document.user as User)._id) !== String(user._id)) {
      throw new ForbiddenException();
    }
    return document;
  }

  async create(todo: Partial<Todo>, user: UserProfile): Promise<void> {
    todo.user = user._id;
    return this.todoRepository.create(todo);
  }

  async updateOne(id: string, todo: Partial<Todo>, user: UserProfile): Promise<void> {
    const document = await this.todoRepository.findOne(id);
    if ((document.user as User)._id !== user._id) {
      throw new ForbiddenException();
    }
    return this.todoRepository.updateOne(id, todo);
  }

  async deleteOne(id: string, user: UserProfile): Promise<void> {
    const document = await this.todoRepository.findOne(id);
    if ((document.user as User)._id !== user._id) {
      throw new ForbiddenException();
    }

    return this.todoRepository.deleteOne(id);
  }
}

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

  async findAll(): Promise<Partial<Todo[]>> {
    return this.todoRepository.findAll();
  }

  async findMyTodos(id: string) {
    return this.todoRepository.findAll({ user: id });
  }

  async findOne(id: string, userProfile: UserProfile): Promise<Partial<Todo>> {
    const document = await this.todoRepository.findOne(id);
    if (userProfile.role !== 'admin' && ((document.user as User)._id) !== userProfile._id) {
      throw new ForbiddenException({ code: ErrorCode.FORBIDDEN });
    }
    return document;
  }

  async create(todo: Partial<Todo>): Promise<void> {
    return this.todoRepository.create(todo);
  }

  async updateOne(id: string, todo: Partial<Todo>, user: UserProfile): Promise<void> {
    const document = await this.todoRepository.findOne(id);
    if ((document.user as User)._id !== user._id) {
      throw new ForbiddenException({ code: ErrorCode.FORBIDDEN });
    }
    return this.todoRepository.updateOne(id, todo);
  }

  async deleteOne(id: string, user: UserProfile): Promise<void> {
    const document = await this.todoRepository.findOne(id);
    if ((document.user as User)._id !== user._id) {
      throw new ForbiddenException({ code: ErrorCode.FORBIDDEN });
    }
    return this.todoRepository.deleteOne(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@td/backend/exception';
import { OrderedItem, Todo, User, UserProfile } from '@td/common/types';
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
    const todos = await this.todoRepository.findAll({ user: user._id });
    let order = 1;
    if (todos.length > 0) {
      order = (todos[todos.length - 1].order || 0) + 1;
    }

    todo.user = user._id;
    todo.order = order;
    return this.todoRepository.create(todo);
  }

  async updateOrder(orderedList: OrderedItem[], user: UserProfile): Promise<void> {
    await Promise.all(orderedList.map(async orderedItem => {
      const { _id, order } = orderedItem;
      const document = await this.todoRepository.findOne(_id);
      if (String((document.user as User)._id) !== String(user._id)) {
        return;
      }
      await this.todoRepository.updateOne(_id, { order });
    }));
  }

  async updateOne(id: string, todo: Partial<Todo>, user: UserProfile): Promise<void> {
    const document = await this.todoRepository.findOne(id);
    if (String((document.user as User)._id) !== String(user._id)) {
      throw new ForbiddenException();
    }
    return this.todoRepository.updateOne(id, todo);
  }

  async deleteOne(id: string, user: UserProfile): Promise<void> {
    const document = await this.todoRepository.findOne(id);
    if (String((document.user as User)._id) !== String(user._id)) {
      throw new ForbiddenException();
    }

    return this.todoRepository.deleteOne(id);
  }
}

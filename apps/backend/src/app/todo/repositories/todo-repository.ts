import { Todo } from '@td/common/types';

export interface TodoRepository {
  findAll(filter?: unknown): Promise<Array<Partial<Todo>>>;

  findOne(id: string): Promise<Partial<Todo>>;

  create(todo: Partial<Todo>): Promise<void>;

  updateOne(id: string, todo: Partial<Todo>): Promise<void>;

  deleteOne(id: string): Promise<void>;
}

export const TodoRepository = Symbol('TodoRepository');

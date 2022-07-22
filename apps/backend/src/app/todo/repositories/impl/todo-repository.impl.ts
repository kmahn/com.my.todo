import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDocument } from '@td/backend/database';
import { Todo } from '@td/common/types';
import { FilterQuery, Model } from 'mongoose';
import { TodoNotFoundException } from '../exceptions/todo-not-found.exception';
import { TodoRepository } from '../todo-repository';

@Injectable()
export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    @InjectModel(TodoDocument.name) private todoModel: Model<TodoDocument>
  ) {
  }

  async create(todo: Partial<Todo>): Promise<void> {
    await this.todoModel.create(todo);
  }

  async deleteOne(id: string): Promise<void> {
    const document = await this.todoModel.findByIdAndDelete(id);
    if (!document) {
      throw new TodoNotFoundException();
    }
  }

  async findAll(filter: FilterQuery<Partial<Todo>> = {}): Promise<Array<Partial<Todo>>> {
    return this.todoModel
      .find()
      .populate('user')
      .lean();
  }

  async findOne(id: string): Promise<Partial<Todo>> {
    const document = await this.todoModel.findById(id)
      .populate('user')
      .lean();
    if (!document) {
      throw new TodoNotFoundException();
    }

    return document;
  }

  async updateOne(id: string, todo: Partial<Todo>): Promise<void> {
    const document = await this.todoModel.findByIdAndUpdate(id, { $set: todo });
    if (!document) {
      throw new TodoNotFoundException();
    }
  }
}

import { User } from '@td/common/types';

export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  user: User | string;
  createdAt: Date;
  updatedAt: Date;
}

import { User } from './user';

export interface Todo {
  _id: string;
  title: string;
  done: boolean;
  user: User | string;
  createdAt: Date;
  updateAt: Date;
}

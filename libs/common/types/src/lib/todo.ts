import { User } from '@td/common/types';
import { OrderedItem } from './ordered-item';

export interface Todo extends OrderedItem {
  _id: string;
  title: string;
  done: boolean;
  user: User | string;
  createdAt: Date;
  updatedAt: Date;
}

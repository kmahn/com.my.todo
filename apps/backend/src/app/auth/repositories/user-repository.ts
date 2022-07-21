import { Auth, User } from '@td/common/types';

export interface UserRepository {
  findOneById(id: string): Promise<Partial<User>>;

  findOneByEmail(email: string): Promise<Partial<User>>;

  findAuthById(id: string): Promise<Partial<Auth>>;

  create(user: Partial<User>): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');

import { ModelDefinition } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, AuthSchema } from './auth.model';
import { LoginInfoDocument, LoginInfoSchema } from './login-info.model';
import { TodoDocument, TodoSchema } from './todo.model';
import { UserDocument, UserSchema } from './user.model';

export * from './auth.model';
export * from './todo.model';
export * from './user.model';
export * from './login-info.model';
// todo: 여기에 추가되는 모델 파일 Export

export interface Models {
  AuthDocument: Model<AuthDocument>;
  UserDocument: Model<UserDocument>;
  TodoDocument: Model<TodoDocument>;
  LoginInfoDocument: Model<LoginInfoDocument>;
  // todo: 여기에 각 모델에 대한 인터페이스 추가
}

export type ModelType = keyof Models;

export const models: ModelDefinition[] = [
  { name: AuthDocument.name, schema: AuthSchema },
  { name: UserDocument.name, schema: UserSchema },
  { name: TodoDocument.name, schema: TodoSchema },
  { name: LoginInfoDocument.name, schema: LoginInfoSchema },
  // todo: 여기에 모델 추가
];

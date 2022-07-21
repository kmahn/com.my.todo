import { ModelDefinition } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, AuthSchema } from './auth.model';
import { LoginInfoDocument, LoginInfoSchema } from './login-info.model';
import { TodoDocument, TodoSchema } from './todo.model';
import { UserDocument, UserSchema } from './user.model';

export * from './auth.model';
export * from './login-info.model'
export * from './todo.model';
export * from './user.model';

// todo: 여기에 추가되는 모델 파일 Export

export interface Models {
  AuthDocument: Model<AuthDocument>;
  LoginInfoDocument: Model<LoginInfoDocument>
  TodoDocument: Model<TodoDocument>;
  UserDocument: Model<UserDocument>;
  // todo: 여기에 각 모델에 대한 인터페이스 추가
}

export type ModelType = keyof Models;

export const models: ModelDefinition[] = [
  { name: AuthDocument.name, schema: AuthSchema },
  { name: LoginInfoDocument.name, schema: LoginInfoSchema },
  { name: TodoDocument.name, schema: TodoSchema },
  { name: UserDocument.name, schema: UserSchema },
  // todo: 여기에 모델 추가
];

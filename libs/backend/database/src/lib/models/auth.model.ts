import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Auth, AUTH_PROVIDERS, AuthProviderType } from '@td/common/types';
import { compareSync, hashSync } from 'bcrypt';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'auth' })
export class AuthDocument extends Document implements Partial<Auth> {
  @Prop({ type: String, enum: AUTH_PROVIDERS, default: 'local' })
  provider?: AuthProviderType;

  @Prop({ type: String, required: true })
  providerId: string;

  @Prop({ type: String })
  hashedPassword: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;

  password?: string;

  validatePassword: (password: string) => boolean;
}

export const AuthSchema = SchemaFactory.createForClass(AuthDocument);

AuthSchema
.virtual('password')
.set(function(password: string) {
  this.hashedPassword = hashSync(password, 12);
});

AuthSchema
.virtual('password')
.get(function() {
  return this.hashedPassword;
});

AuthSchema.methods.validatePassword = function(password: string): boolean {
  return compareSync(password, this.hashedPassword);
};

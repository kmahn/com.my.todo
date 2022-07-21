import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, USER_ROLES, UserRoleType } from '@td/common/types';
import mongoose, { Document } from 'mongoose';

@Schema({
  collection: 'user'
})
export class UserDocument extends Document implements Partial<User> {
  @Prop({ type: String, lowercase: true, trim: true, unique: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, required: true })
  name: string;

  @Prop({ type: String, enum: USER_ROLES, default: 'member' })
  role?: UserRoleType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  auth?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

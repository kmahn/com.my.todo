import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'logininfo' })
export class LoginInfoDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;

  @Prop({ type: String, unique: true, required: true })
  refreshToken: string;

  // todo: 여기에 로그인 관련 정보 추가

  @Prop({ type: Date, default: Date.now, expires: '30d' })
  createdAt: Date;
}

export const LoginInfoSchema = SchemaFactory.createForClass(LoginInfoDocument);

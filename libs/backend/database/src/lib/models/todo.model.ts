import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Todo } from '@td/common/types';
import mongoose, { Document } from 'mongoose';
import { UserDocument } from './user.model';

@Schema({
  collection: 'todo',
  timestamps: true,
})
export class TodoDocument extends Document implements Partial<Todo> {
  @Prop({ type: String, trim: true, required: true, index: true })
  title: string;

  @Prop({ type: Boolean, default: false })
  done?: boolean;

  @Prop({
    type: Number,
    default: 0,
    index: true,
  })
  order?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserDocument.name,
    required: true,
    index: true,
  })
  user: string;

}

export const TodoSchema = SchemaFactory.createForClass(TodoDocument);

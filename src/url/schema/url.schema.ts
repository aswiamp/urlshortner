/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type UrlDocument = mongoose.HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop()
  longUrl: string;

  @Prop()
  shortUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
// src/user/schema/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../auth/roles.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true }) // Exclude password from queries by default
  password: string;

  @Prop({ enum: Role, default: Role.User }) 
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
// This schema defines the structure of the User document in MongoDB
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
  return this.userModel.findOne({ email }).exec();
}

  async findById(id: string): Promise<UserDocument | null> {
  return this.userModel.findById(id).exec();
}

}

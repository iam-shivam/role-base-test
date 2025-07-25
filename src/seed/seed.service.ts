import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema'; // Adjust path
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async onModuleInit() {
    const userCount = await this.userModel.countDocuments();
    if (userCount === 0) {
      const saltRounds = 10;

      const users = [
        {
          name: 'Admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('admin123', saltRounds),
          role: 'admin',
        },
        {
          name: 'User One',
          email: 'user1@example.com',
          password: await bcrypt.hash('user123', saltRounds),
          role: 'user',
        },
        {
          name: 'User Two',
          email: 'user2@example.com',
          password: await bcrypt.hash('user123', saltRounds),
          role: 'user',
        },
        {
          name: 'User Three',
          email: 'user3@example.com',
          password: await bcrypt.hash('user123', saltRounds),
          role: 'user',
        },
      ];

      await this.userModel.insertMany(users);
      Logger.log('✅ Seeded initial users with hashed passwords.');
    } else {
      Logger.log('⚠️ Users already exist. Skipping seed.');
    }
  }
}

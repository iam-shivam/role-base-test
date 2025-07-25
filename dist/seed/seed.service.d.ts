import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema';
export declare class SeederService implements OnModuleInit {
    private userModel;
    constructor(userModel: Model<User>);
    onModuleInit(): Promise<void>;
}

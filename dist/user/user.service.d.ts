import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
}

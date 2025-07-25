import { Document, Types } from 'mongoose';
export declare class Availability extends Document {
    userId: Types.ObjectId;
    userName: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}
export declare const AvailabilitySchema: import("mongoose").Schema<Availability, import("mongoose").Model<Availability, any, any, any, Document<unknown, any, Availability, any> & Availability & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Availability, Document<unknown, {}, import("mongoose").FlatRecord<Availability>, {}> & import("mongoose").FlatRecord<Availability> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

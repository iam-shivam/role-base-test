import { Model } from 'mongoose';
import { Availability } from './schemas/availability.schema';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
export declare class AvailabilityService {
    private readonly availabilityModel;
    constructor(availabilityModel: Model<Availability>);
    create(dto: CreateAvailabilityDto, userId: string): Promise<Availability[]>;
    private generate30MinSlots;
    getAvailableSlots(date: string): Promise<any[]>;
    markSlotAsBooked(userId: string, date: string, startTime: string): Promise<{
        message: string;
        userId: string;
        date: string;
        startTime: string;
    }>;
    private splitInto30MinSlots;
}

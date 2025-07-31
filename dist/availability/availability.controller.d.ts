import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    createAvailability(dto: CreateAvailabilityDto, req: RequestWithUser): Promise<import("./schemas/availability.schema").Availability[]>;
    getAvailableSlots(date: string): Promise<any[]>;
    bookSlot(userId: string, date: string, startTime: string): Promise<{
        message: string;
        userId: string;
        date: string;
        startTime: string;
    }>;
}

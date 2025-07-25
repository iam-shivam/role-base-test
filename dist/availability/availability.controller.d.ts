import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    createAvailability(dto: CreateAvailabilityDto, req: any): Promise<import("./schemas/availability.schema").Availability[]>;
    getAvailableSlots(date: string): Promise<any[]>;
    bookSlot(userId: string, date: string, startTime: string): Promise<{
        message: string;
        userId: string;
        date: string;
        startTime: string;
    }>;
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Availability } from './schemas/availability.schema';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import * as moment from 'moment';
 import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// dayjs.extend(isSameOrBefore)
// dayjs.extend(isSameOrBefore);
// dayjs.extend(customParseFormat);
@Injectable()
export class AvailabilityService {
  constructor(
    @InjectModel(Availability.name)
    private readonly availabilityModel: Model<Availability>,
  ) {}

  async create(dto: CreateAvailabilityDto, userId: string): Promise<Availability[]> {
    // Validate time format and range
    const start = moment(dto.startTime, 'HH:mm', true);
    const end = moment(dto.endTime, 'HH:mm', true);

    if (!start.isValid() || !end.isValid()) {
      throw new BadRequestException('Invalid time format. Use HH:mm (24-hour format)');
    }

    if (start.isSameOrAfter(end)) {
      throw new BadRequestException('Start time must be before end time');
    }

    // Validate date range
    const date = moment(dto.date, 'YYYY-MM-DD', true);
    if (!date.isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }

    const today = moment().startOf('day');
    const maxDate = moment().add(7, 'days').endOf('day');

    if (date.isBefore(today) || date.isAfter(maxDate)) {
      throw new BadRequestException('Availability must be set from today up to 7 days only');
    }

    // Generate 30-minute slots
    const slots = this.generate30MinSlots(dto.startTime, dto.endTime);

    // Create availability slots
    const availabilitySlots = slots.map(slot => ({
      userId: new Types.ObjectId(userId),
      userName: dto.userName,
      date: dto.date,
      startTime: slot.start,
      endTime: slot.end,
      isBooked: false,
    }));

    return this.availabilityModel.create(availabilitySlots);
  }

  private generate30MinSlots(startTime: string, endTime: string): { start: string; end: string }[] {
    const slots: { start: string; end: string }[] = [];
    let current = moment(startTime, 'HH:mm');
    const end = moment(endTime, 'HH:mm');

    while (current.isBefore(end)) {
      const slotEnd = moment(current).add(30, 'minutes');
      
      // Don't create partial slots at the end
      if (slotEnd.isAfter(end)) {
        break;
      }

      slots.push({
        start: current.format('HH:mm'),
        end: slotEnd.format('HH:mm'),
      });

      current = slotEnd;
    }

    return slots;
  }


 async getAvailableSlots(date: string) {
  const all = await this.availabilityModel.find({ date, isBooked: false }).lean();
  const result: any[] = [];

  const slotMap = new Map<string, boolean>();

  const bookedSlots = await this.availabilityModel.find({ date, isBooked: true }).lean();

  for (const b of bookedSlots) {
    slotMap.set(`${b.userName}_${b.startTime}`, true);
  }

  for (const item of all) {
    const key = `${item.userName}_${item.startTime}`;
    const prev = moment(item.startTime, 'HH:mm').subtract(30, 'minutes').format('HH:mm');
    const next = moment(item.startTime, 'HH:mm').add(30, 'minutes').format('HH:mm');

    const prevKey = `${item.userName}_${prev}`;
    const nextKey = `${item.userName}_${next}`;

    if (!slotMap.has(key) && !slotMap.has(prevKey) && !slotMap.has(nextKey)) {
      result.push({
        userId: item.userName,
        date,
        startTime: item.startTime,
        endTime: item.endTime,
      });
    }
  }

  return result;
}

async markSlotAsBooked(userId: string, date: string, startTime: string) {
  const slot = await this.availabilityModel.findOne({
    user: userId,
    date,
    startTime,
    isBooked: false,
  });

  if (!slot) {
    throw new BadRequestException('Slot not available or already booked');
  }

  slot.isBooked = true;
  await slot.save();

  return {
    message: 'Slot booked successfully',
    userId,
    date,
    startTime,
  };
}

 

private splitInto30MinSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  let startTime = dayjs(start, 'HH:mm');
  const endTime = dayjs(end, 'HH:mm');

  while (startTime.add(30, 'minute').isSameOrBefore(endTime)) {
    slots.push(startTime.format('HH:mm'));
    startTime = startTime.add(30, 'minute');
  }

  return slots;
}



}

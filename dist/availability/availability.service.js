"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const availability_schema_1 = require("./schemas/availability.schema");
const moment = require("moment");
const dayjs_1 = require("dayjs");
let AvailabilityService = class AvailabilityService {
    availabilityModel;
    constructor(availabilityModel) {
        this.availabilityModel = availabilityModel;
    }
    async create(dto, userId) {
        const start = moment(dto.startTime, 'HH:mm', true);
        const end = moment(dto.endTime, 'HH:mm', true);
        if (!start.isValid() || !end.isValid()) {
            throw new common_1.BadRequestException('Invalid time format. Use HH:mm (24-hour format)');
        }
        if (start.isSameOrAfter(end)) {
            throw new common_1.BadRequestException('Start time must be before end time');
        }
        const date = moment(dto.date, 'YYYY-MM-DD', true);
        if (!date.isValid()) {
            throw new common_1.BadRequestException('Invalid date format. Use YYYY-MM-DD');
        }
        const today = moment().startOf('day');
        const maxDate = moment().add(7, 'days').endOf('day');
        if (date.isBefore(today) || date.isAfter(maxDate)) {
            throw new common_1.BadRequestException('Availability must be set from today up to 7 days only');
        }
        const slots = this.generate30MinSlots(dto.startTime, dto.endTime);
        const availabilitySlots = slots.map(slot => ({
            userId: new mongoose_2.Types.ObjectId(userId),
            userName: dto.userName,
            date: dto.date,
            startTime: slot.start,
            endTime: slot.end,
            isBooked: false,
        }));
        return this.availabilityModel.create(availabilitySlots);
    }
    generate30MinSlots(startTime, endTime) {
        const slots = [];
        let current = moment(startTime, 'HH:mm');
        const end = moment(endTime, 'HH:mm');
        while (current.isBefore(end)) {
            const slotEnd = moment(current).add(30, 'minutes');
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
    async getAvailableSlots(date) {
        const all = await this.availabilityModel.find({ date, isBooked: false }).lean();
        const result = [];
        const slotMap = new Map();
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
    async markSlotAsBooked(userId, date, startTime) {
        const slot = await this.availabilityModel.findOne({
            user: userId,
            date,
            startTime,
            isBooked: false,
        });
        if (!slot) {
            throw new common_1.BadRequestException('Slot not available or already booked');
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
    splitInto30MinSlots(start, end) {
        const slots = [];
        let startTime = (0, dayjs_1.default)(start, 'HH:mm');
        const endTime = (0, dayjs_1.default)(end, 'HH:mm');
        while (startTime.add(30, 'minute').isSameOrBefore(endTime)) {
            slots.push(startTime.format('HH:mm'));
            startTime = startTime.add(30, 'minute');
        }
        return slots;
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(availability_schema_1.Availability.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map
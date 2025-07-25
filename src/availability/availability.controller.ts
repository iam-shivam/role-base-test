import { Controller, Post, Get, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Availability')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.User)
@Controller('availability')
export class AvailabilityController {
  constructor(private  readonly availabilityService: AvailabilityService) { }

  @Post()
  @Roles(Role.User)
  async createAvailability(@Body() dto: CreateAvailabilityDto, @Req() req) {
    return this.availabilityService.create(dto, req.user.userId);
  }

  @Get('slots')
  @Roles(Role.Admin)
  async getAvailableSlots(@Query('date') date: string) {
    return this.availabilityService.getAvailableSlots(date);
  }

  @Post('book')
  @Roles(Role.Admin)
  async bookSlot(@Query('userId') userId: string, @Query('date') date: string, @Query('startTime') startTime: string) {
    return this.availabilityService.markSlotAsBooked(userId, date, startTime);
  }
}

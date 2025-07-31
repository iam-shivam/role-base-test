import { Controller, Post, Get, Body, Query, UseGuards, Request as ReqDecorator } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';

@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private  readonly availabilityService: AvailabilityService) { }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiBearerAuth()
  @Post()
  async createAvailability(@Body() dto: CreateAvailabilityDto, @ReqDecorator() req: RequestWithUser) {
    console.log('Creating availability for user:', req.user);
    return this.availabilityService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('slots')
  async getAvailableSlots(@Query('date') date: string) {
    return this.availabilityService.getAvailableSlots(date);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('book')
  async bookSlot(@Query('userId') userId: string, @Query('date') date: string, @Query('startTime') startTime: string) {
    return this.availabilityService.markSlotAsBooked(userId, date, startTime);
  }
}

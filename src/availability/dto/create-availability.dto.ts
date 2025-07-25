// src/availability/dto/create-availability.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAvailabilityDto {
  

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '60c72b2f9b1d8c001c8e4f3a' }) // Example user ID
  userId: string;
  
  @IsNotEmpty()
  @ApiProperty({ example: 'JohnDoe' }) 
  @IsString()
  userName: string;

  @IsNotEmpty()
  @ApiProperty({ example: '2025-07-25' })
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @ApiProperty({ example: '09:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '17:30' })
  @IsString()
  endTime: string;

}

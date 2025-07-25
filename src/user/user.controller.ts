import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
     @UseGuards(JwtAuthGuard)
     @ApiBearerAuth()
  @Get('me')
  getProfile(@Req() req: any) {
    return req.user; // should show userId, email, role
  }
}

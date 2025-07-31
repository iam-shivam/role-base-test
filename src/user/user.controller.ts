import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('user')
export class UserController {
     @UseGuards(JwtAuthGuard,RolesGuard)
      @Roles(Role.User) // Ensure user is authenticated and has 'user' role
     @ApiBearerAuth()
    @Get('me')
    getProfile(@Req() req: any) {
    return req.user; // should show userId, email, role
  }
}

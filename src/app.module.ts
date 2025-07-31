import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { AvailabilityController } from './availability/availability.controller';
import { AvailabilityModule } from './availability/availability.module';
import { SlotsService } from './slots/slots.service';
import { SlotsModule } from './slots/slots.module';
import { SeederService  } from './seed/seed.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './user/schema/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';
import { AvailabilityService } from './availability/availability.service';
import { Availability, AvailabilitySchema } from './availability/schemas/availability.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/role-based-auth'), // Connect to MongoDB
    MongooseModule.forFeature([
  { name: User.name, schema: UserSchema } , // ✅ CORRECT
   { name: Availability.name, schema: AvailabilitySchema }  // ✅ CORRECT
]) ,   
    AuthModule, 
    UserModule,
    AvailabilityModule, 
    SlotsModule],
  controllers: [AppController, AuthController, UserController, AvailabilityController],
  providers: [
    AppService,
     AuthService, UserService, SlotsService, SeederService,AvailabilityService
  ],
})
export class AppModule {}

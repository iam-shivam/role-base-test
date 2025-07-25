"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const user_controller_1 = require("./user/user.controller");
const availability_controller_1 = require("./availability/availability.controller");
const availability_module_1 = require("./availability/availability.module");
const slots_service_1 = require("./slots/slots.service");
const slots_module_1 = require("./slots/slots.module");
const seed_service_1 = require("./seed/seed.service");
const user_module_1 = require("./user/user.module");
const user_service_1 = require("./user/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const user_schema_1 = require("./user/schema/user.schema");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./auth/roles/roles.guard");
const availability_service_1 = require("./availability/availability.service");
const availability_schema_1 = require("./availability/schemas/availability.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/role-based-auth'),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: availability_schema_1.Availability.name, schema: availability_schema_1.AvailabilitySchema }
            ]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            availability_module_1.AvailabilityModule,
            slots_module_1.SlotsModule
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, user_controller_1.UserController, availability_controller_1.AvailabilityController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            app_service_1.AppService,
            auth_service_1.AuthService, user_service_1.UserService, slots_service_1.SlotsService, seed_service_1.SeederService, availability_service_1.AvailabilityService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
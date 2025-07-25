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
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let SeederService = class SeederService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async onModuleInit() {
        const userCount = await this.userModel.countDocuments();
        if (userCount === 0) {
            const saltRounds = 10;
            const users = [
                {
                    name: 'Admin',
                    email: 'admin@example.com',
                    password: await bcrypt.hash('admin123', saltRounds),
                    role: 'admin',
                },
                {
                    name: 'User One',
                    email: 'user1@example.com',
                    password: await bcrypt.hash('user123', saltRounds),
                    role: 'user',
                },
                {
                    name: 'User Two',
                    email: 'user2@example.com',
                    password: await bcrypt.hash('user123', saltRounds),
                    role: 'user',
                },
                {
                    name: 'User Three',
                    email: 'user3@example.com',
                    password: await bcrypt.hash('user123', saltRounds),
                    role: 'user',
                },
            ];
            await this.userModel.insertMany(users);
            common_1.Logger.log('✅ Seeded initial users with hashed passwords.');
        }
        else {
            common_1.Logger.log('⚠️ Users already exist. Skipping seed.');
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SeederService);
//# sourceMappingURL=seed.service.js.map
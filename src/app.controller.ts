import {
    Controller,
    Get,
    Request,
    Post,
    UseGuards,
    Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/create-user.dto';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('auth/login')
    async login(@Body() createUserDto: CreateUserDto) {
        return this.authService.login(createUserDto);
    }

    @Post('auth/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req);
        return req.user;
    }
}

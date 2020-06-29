import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            if (await bcrypt.compare(pass, user.password)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user;
                return result;
            }
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
    }

    async login(user: CreateUserDto) {
        const result = await this.validateUser(user.email, user.password);
        const payload = { email: result.email, sub: result.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}

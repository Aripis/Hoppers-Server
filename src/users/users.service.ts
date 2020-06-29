import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();

        Object.assign(user, createUserDto);

        try {
            user.password = await bcrypt.hash(user.password, 10);
            const result = await this.usersRepository.save(user);
            return result;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException(
                    'The user already exists',
                    HttpStatus.FORBIDDEN,
                );
            }
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email: email } });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}

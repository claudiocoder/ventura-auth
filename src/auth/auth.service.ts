import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, password, name } = registerUserDto;
    try {
      const user = await this.user.findUnique({ where: { email } });
      if (user) {
        throw new RpcException({ status: 400, message: 'User already exists' });
      }
      const newUser = await this.user.create({
        data: { email, name, password: hashSync(password, 10) },
      });
      const { password: __, ...userWithoutPassword } = newUser;

      return {
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new RpcException({ status: 400, message: error.message });
    }
  }
}

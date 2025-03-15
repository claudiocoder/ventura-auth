import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { clerkId, email, firstName, lastName, imageUrl } = registerUserDto;
    try {
      const user = await this.user.findUnique({ where: { clerkId } });
      if (user) {
        throw new RpcException({ status: 400, message: 'User already exists' });
      }
      const newUser = await this.user.create({
        data: { clerkId, email, firstName, lastName, imageUrl },
      });

      return {
        user: newUser,
      };
    } catch (error) {
      throw new RpcException({ status: 400, message: error.message });
    }
  }
}

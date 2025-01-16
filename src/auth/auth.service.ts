import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  async registerUser(registerUserDto: RegisterUserDto) {
    try {
      // Register user
      return { data: { ...registerUserDto } };
    } catch (error) {
      throw new RpcException({ status: 400, message: error.message });
    }
  }
}

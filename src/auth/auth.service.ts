import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  async registerUser(registerUserDto: RegisterUserDto) {
    console.log('Registering user...', registerUserDto);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if(user && comparePasswords(pass, user.password)) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

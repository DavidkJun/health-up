import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    console.log('Entered validator')
    const user = await this.userService.getUserByEmail(email)
    if(user) {
      const matched = comparePasswords(password, user.password);
      if(matched) {
        console.log('User Validation Success');
        return this.jwtService.sign(user);
      } else {
        //console.log('Passwords dont match');
        throw new HttpException("Passwords do not match", 401)
      }
    }
    throw new HttpException("Validation Failed", 401)
  }
}

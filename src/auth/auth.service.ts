import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    console.log('Entered validator')
    const user = await this.userService.getUserByEmail(email)
    if(user) {
      const matched = comparePasswords(password, user.password);
      if(matched) {
        console.log('User Validation Success');
        return user;
      } else {
        console.log('Passwords dont match');
        return null;
      }
    }
    console.log('User Validation Failed')
    return null;
  }
}

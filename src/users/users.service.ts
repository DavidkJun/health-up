import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  private users: UserDto[] = [];

  findAll(): UserDto[] {
    return this.users;
  }

  createUser(user: UserDto): UserDto {
    this.users.push(user);
    return user;
  }

  updateUser(id: number, updatedUser: UserDto): UserDto | undefined {
    const index = this.users.findIndex(user => user.id === id)
    if(index > -1) {
      this.users[index] = { ...updatedUser, id };
      return this.users[index];
    }
    return undefined;
  }

  deleteUser(id: number): void{
    this.users = this.users.filter(user => user.id !== id)
  }
}

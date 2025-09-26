import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }
  getUserById(id: number) {
    return this.prisma.user.findUnique({where: {id}})
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    const findUser = await this.getUserById(id);
    if(!findUser) throw new HttpException('User Not Found',404);

    if(data.email) {
      const findUser = await this.prisma.user.findUnique({where: {email: data.email as string}})

      if(findUser) throw new HttpException('Email already taken', 400)
    }
    return this.prisma.user.update({ where: {id}, data} );
  }
  async deleteUserById(id: number) {
    const findUser = await this.getUserById(id);
    if(!findUser) throw new HttpException("User Not Found", 404);
    return this.prisma.user.delete({where:{ id }})
  }
}



/*
  private users: UserDto[] = [];
 findAll(): UserDto[] {
    return this.users;
  }

  createUser(user: UserDto): UserDto {
    this.users.push(user);
    return user;
  }

  updateUser(id: number, updatedUser: UserDto): UserDto | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users[index] = { ...updatedUser, id };
      return this.users[index];
    }
    return undefined;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
*/
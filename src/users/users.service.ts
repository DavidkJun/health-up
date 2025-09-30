import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {encodePassword} from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    const password = encodePassword(data.password)
    return this.prisma.user.create({ data: {
      ...data, password
    }
    });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }
  getUserById(id: number) {
    return this.prisma.user.findUnique({where: {id}})
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({where: {email}})
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
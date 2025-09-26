import {
  Body,
  Controller,
  Delete,
  Get, HttpException,
  Param, ParseIntPipe, Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.userService.createUser(createUserDto)
  }
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }
  @Get(':id')
  async getUsersById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id)
    if(!user) throw new HttpException("User Not Found",404)
    return user;
  }
  @Patch(':id')
  updateUserById(@Param('id',ParseIntPipe)id: number, @Body() updateUserDto: UpdateUserDto ) {
    return this.userService.updateUserById(id, updateUserDto)
  }
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe)id: number) {
    return this.userService.deleteUserById(id);
  }
}
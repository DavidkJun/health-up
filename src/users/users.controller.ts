import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  findUsers(): UserDto[] {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: UserDto): UserDto {
     return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UserDto): UserDto | undefined {
    return this.userService.updateUser(+id, user)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(+id)
  }
}

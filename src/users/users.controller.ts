import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') // Creates a "Users" section in Swagger
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g., invalid email).' })
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User data.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUsersById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User Not Found', 404);
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
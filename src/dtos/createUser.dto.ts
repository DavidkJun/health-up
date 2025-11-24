import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{

  @ApiProperty({ example: 'John', description: 'Name of user'})
  @IsString()
  @IsNotEmpty({ message: "Name is required"})
  name: string;

  @ApiProperty({ example: 'example123.gmail.com', description: 'Email of user'})
  @IsString()
  @IsEmail({},{ message: "Wrong email"})
  @IsNotEmpty({message: "Email is required"})
  email: string;

  @ApiProperty({ example: 1234, description: 'Safe password for users account'})
  @IsString()
  @IsNotEmpty({message: "Password is required"})
  password: string;

  @ApiProperty({ example: 67, description: 'Age of user'})
  @IsNumber()
  @Min(1,{message: "Age must be greater then 0"})
  @Max(120, {message: "Age must be smaller that 120"})
  @IsOptional()
  age: number;

  @ApiProperty({ example: 90, description: 'Weight of user'})
  @IsNumber()
  @Min(1,{message: "Weight must be greater then 0"})
  @Max(300, {message: "Weight must be smaller that 300"})
  @IsOptional()
  weight: number;
}
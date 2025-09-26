import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsNumber()
  weight: number;
}

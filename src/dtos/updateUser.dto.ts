import { IsEmail, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail({},{ message: "Wrong email"})
  @IsOptional()
  email: string;

  @IsNumber()
  @Min(1,{message: "Age must be greater then 0"})
  @Max(120, {message: "Age must be smaller that 120"})
  @IsOptional()
  age: number;

  @IsNumber()
  @Min(1,{message: "Weight must be greater then 0"})
  @Max(300, {message: "Weight must be smaller that 300"})
  @IsOptional()
  weight: number;
}
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min} from 'class-validator';

export class CreateUserDto{
  @IsString()
  @IsNotEmpty({ message: "Name is required"})
  name: string;

  @IsString()
  @IsEmail({},{ message: "Wrong email"})
  @IsNotEmpty({message: "Email is required"})
  email: string;

  @IsNumber()
  @Min(1,{message: "Age must be greater then 0"})
  @Max(120, {message: "Age must be smaller that 120"})
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @Min(1,{message: "Weight must be greater then 0"})
  @Max(300, {message: "Weight must be smaller that 300"})
  @IsNotEmpty()
  weight: number;
}

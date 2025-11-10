import {
  IsArray, IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseDto } from './createExercise.dto';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required"})
  name: string;

  @IsDateString()
  @IsNotEmpty({message: "Date is required"})
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}

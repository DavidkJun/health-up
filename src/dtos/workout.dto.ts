import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExerciseDto } from './createExercise.dto';

export class WorkoutDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

 @IsDateString()
 @IsNotEmpty()
 date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];

}
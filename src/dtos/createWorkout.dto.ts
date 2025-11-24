import {
  IsArray, IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseDto } from './createExercise.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Back day', description: 'description' })
  @IsString()
  @IsNotEmpty({ message: "Name is required"})
  name: string;

  @ApiProperty({ example: '2001-9-11:00:00.000Z', description: 'Workout date' })
  @IsDateString()
  @IsNotEmpty({message: "Date is required"})
  date: string;

  @ApiProperty({ type: [CreateExerciseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}

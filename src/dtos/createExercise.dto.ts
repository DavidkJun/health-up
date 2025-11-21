import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsNumber()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(1)
  sets: number;
}
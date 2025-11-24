import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Bench press', description: 'Description' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 90, description: 'Weight for exercise'})
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({ example: 10, description: 'Number of reps' })
  @IsNumber()
  @Min(1)
  reps: number;

  @ApiProperty({ example: 3, description: 'Number of sets' })
  @IsNumber()
  @Min(1)
  sets: number;
}
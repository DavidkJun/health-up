import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './createWorkout.dto';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {}
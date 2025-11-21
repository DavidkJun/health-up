import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param, HttpException,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtGuard } from '../Guards/jwt.guard';
import { CreateWorkoutDto } from '../dtos/createWorkout.dto';
import { Prisma, Workout } from '@prisma/client';
import { UpdateWorkoutDto } from '../dtos/updateWorkout.dto';

@UseGuards(JwtGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() dto: CreateWorkoutDto, @Request() req): Promise<Workout> {
      const userId = req.user.id;
      const dataForService: Prisma.WorkoutCreateInput = {
        name: dto.name,
        date: new Date(dto.date),
        user: {
          connect: { id: userId },
        },
        exercises: {
          createMany: {
            data: dto.exercises,
          }
        }
      };

      return this.workoutsService.createWorkout(dataForService)
  }

  @Get()
  getWorkouts(@Request() req,): Promise<Workout[]> {
    const userId = req.user.id;
    return this.workoutsService.getWorkouts(userId);
  }

  @Get(':id')
  async getWorkoutById(
    @Param('id', ParseIntPipe) id: number, @Request() req): Promise<Workout> {
    const userId = req.user.id;
    const userWorkout = await this.workoutsService.getWorkoutById(id, userId);
    if(!userWorkout) throw new HttpException("Workout not found", 404);

    return userWorkout;
  }

  @Patch(':id')
  async updateWorkout(
    @Param('id',
      ParseIntPipe) id: number,
    @Request() req,
    @Body() updateWorkoutDto: UpdateWorkoutDto

  ): Promise<Workout> {
    const userId = req.user.id;
    const dataForService: Prisma.WorkoutUpdateInput = {
      name: updateWorkoutDto.name,
      date: updateWorkoutDto.date ? new Date(updateWorkoutDto.date) : undefined,
      exercises: updateWorkoutDto.exercises ? {
        deleteMany: {},

        createMany: {
          data: updateWorkoutDto.exercises
        }
      } : undefined,
    }

    const updatedWorkout= await this.workoutsService.updateWorkoutById(id, dataForService, userId);
    if(!updatedWorkout) throw new HttpException("Workout not found", 404);

    return updatedWorkout;
  }

  @Delete(":id")
  async deleteWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const deletedWorkout = await this.workoutsService.deleteWorkout(id, userId);
    if(!deletedWorkout) throw new HttpException("Workout not found", 404);

    return {
      message: "Workout deleted successfully"
    }
  }
}

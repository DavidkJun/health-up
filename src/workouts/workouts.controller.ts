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
  Param,
  HttpException,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtGuard } from '../Guards/jwt.guard';
import { CreateWorkoutDto } from '../dtos/createWorkout.dto';
import { Prisma, Workout } from '@prisma/client';
import { UpdateWorkoutDto } from '../dtos/updateWorkout.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Workouts')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'The workout has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  @UsePipes(ValidationPipe)
  create(@Body() dto: CreateWorkoutDto, @Request() req): Promise<Workout> {
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
        },
      },
    };

    return this.workoutsService.createWorkout(dataForService);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workouts for the current user' })
  @ApiResponse({ status: 200, description: 'Return all workouts with exercises.' })
  getWorkouts(@Request() req): Promise<Workout[]> {
    const userId = req.user.id;
    return this.workoutsService.getWorkouts(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workout by ID' })
  @ApiResponse({ status: 200, description: 'Return the workout data.' })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  async getWorkoutById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Workout> {
    const userId = req.user.id;
    const userWorkout = await this.workoutsService.getWorkoutById(id, userId);
    if (!userWorkout) throw new HttpException('Workout not found', 404);

    return userWorkout;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workout' })
  @ApiResponse({ status: 200, description: 'The workout has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  async updateWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    const userId = req.user.id;
    const dataForService: Prisma.WorkoutUpdateInput = {
      name: updateWorkoutDto.name,
      date: updateWorkoutDto.date ? new Date(updateWorkoutDto.date) : undefined,
      exercises: updateWorkoutDto.exercises
        ? {
          deleteMany: {},
          createMany: {
            data: updateWorkoutDto.exercises,
          },
        }
        : undefined,
    };

    const updatedWorkout = await this.workoutsService.updateWorkoutById(
      id,
      dataForService,
      userId,
    );
    if (!updatedWorkout) throw new HttpException('Workout not found', 404);

    return updatedWorkout;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiResponse({ status: 200, description: 'The workout has been deleted.' })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  async deleteWorkout(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const deletedWorkout = await this.workoutsService.deleteWorkout(id, userId);
    if (!deletedWorkout) throw new HttpException('Workout not found', 404);

    return {
      message: 'Workout deleted successfully',
    };
  }
}
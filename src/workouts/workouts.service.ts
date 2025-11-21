import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {
  }

  createWorkout(data: Prisma.WorkoutCreateInput) {
    return this.prisma.workout.create({
      data,
      include: {
        exercises: true
      }
    });
  }

  getWorkouts(userId: number) {
    return this.prisma.workout.findMany(
      {where: {userId: userId},
        include: {
          exercises: true
        }});
  }

  getWorkoutById(id: number, userId: number) {
    return this.prisma.workout.findFirst(
      {where: {id: id, userId: userId},
      include: {
        exercises: true
      }});
  }

  async updateWorkoutById(id: number, data: Prisma.WorkoutUpdateInput, userId: number) {
    const findWorkout = await this.getWorkoutById(id, userId);
    if(!findWorkout) throw new HttpException('Workout Not Found',404);

    return this.prisma.workout.update({
      where: {id: id},
      data,
      include: {
        exercises: true
      }
    });
  }

  async deleteWorkout(id: number, userId: number) {
    const findWorkout = await this.getWorkoutById(id, userId);
    if(!findWorkout) throw new HttpException("Workout Not Found", 404);
    return this.prisma.workout.delete({where:{ id }})
  }
}

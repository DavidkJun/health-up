import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getNumberOfWorkouts(userId): Promise<number> {
    return this.prismaService.workout.count({where: {userId: userId}}) }
}
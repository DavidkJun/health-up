import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { WorkoutsModule } from '../workouts/workouts.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [WorkoutsModule, PrismaModule],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}

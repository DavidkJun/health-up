import { Get, Controller, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../Guards/jwt.guard';
import { StatsService } from './stats.service';

@UseGuards(JwtGuard)
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getWorkoutCount(@Request() req): Promise<number> {
    const user_id = req.user.id;
    return await this.statsService.getNumberOfWorkouts(user_id)
  }
}


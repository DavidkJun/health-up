import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ConfigModule.forRoot(), WorkoutsModule],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}

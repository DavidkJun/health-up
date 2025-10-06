import { Controller, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthPayloadDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from '../Guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() authPayload: AuthPayloadDto){
    return this.authService.validateUser({ email: authPayload.email, password: authPayload.password })
  }
}

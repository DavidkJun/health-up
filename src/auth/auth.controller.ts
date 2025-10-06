import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthPayloadDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  login(@Body() authPayload: AuthPayloadDto){
    return this.authService.validateUser(authPayload.email, authPayload.password)
  }
}

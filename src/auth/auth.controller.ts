import { Controller, UseGuards, Request} from '@nestjs/common';
import { Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from '../Guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req){
    return this.authService.login(req.user);
  }
}

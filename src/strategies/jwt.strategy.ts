import { Injectable} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as process from 'node:process';
import { UsersService } from '../users/users.service';
import {UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    const secret = process.env.SECRET;
    if(!secret){
      throw new Error('FATAL ERROR: JWT secret is not defined in environment variables')
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey: secret,
    });
  }
  async validate(payload: any) {
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found or token invalid');
    }
    return user;
  }
}
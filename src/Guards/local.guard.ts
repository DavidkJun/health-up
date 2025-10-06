import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }
}
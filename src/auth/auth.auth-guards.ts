import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject() private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException({ message: 'Invalid or unauthorized' });
      }
      const user = this.authService.verifyToken(token);

      request.user = user;
      return true;
    } catch (e: any) {
      throw new UnauthorizedException(`Sorry, your ${e?.message}`);
    }
  }
}
